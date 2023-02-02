const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const db = require('../config-mysql');
const redisClient = require('../config-redis');
const authMiddleware = require('../middleware/auth');

const createToken = async (id) => {
  return await new Promise((resolve, reject) => {
    jwt.sign(
      { userId: id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '30m',
      },
      (error, token) => {
        if (error) {
          console.log(`createToken error!: ${error}`);
          return reject(error);
        }
        return resolve(token);
      }
    );
  });
};

const tokenToRedis = async (id, token) => {
  console.log(id + ' ' + token);
  return await redisClient
    .set(id, token, {
      EX: 60 * 30,
    })
    .then((res) => {
      console.log(`tokenToRedis: ${res}`);
      return true;
    })
    .catch((error) => {
      console.log(`tokenToRedis error!: ${error}`);
      return false;
    });
};

const deleteRedisValue = async (key) => {
  return await redisClient
    .del(key)
    .then((value) => {
      console.log(`deleteRedisValue: ${value}`);
    })
    .catch((error) => {
      console.log(`deleteRedisValue error!: ${error}`);
    });
};

const checkJoined = async (platform, id) => {
  const [rows, fields] = await (
    await db
  ).execute(`SELECT count(*) as count FROM users WHERE id = ${platform === 'naver' ? '?' : 'UNHEX(?)'}`, [id]);
  return rows[0].count;
};

router.post('/authentication', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [rows, fields] = await (await db).execute('SELECT id, password, name FROM users WHERE email = ?', [email]);

    if (rows.length === 1) {
      bcrypt.compare(password, rows[0].password, async (bcryptError, bcryptResult) => {
        if (bcryptError) next(bcryptError);
        else if (bcryptResult) {
          const userId = rows[0].id.toString('hex');
          const accessToken = await createToken(userId);
          const resultRedis = await tokenToRedis(userId, accessToken);
          if (resultRedis) {
            res.cookie(`accessToken=${accessToken}; HttpOnly;`);
            res.json({ result: true, userId: userId, userName: rows[0].name });
          }
        } // 비밀번호가 db에서 조회된 것과 같지 않는 경우
        else res.json({ result: false, content: 'password' });
      }); // 이메일이 db에서 조회되지 않는 경우
    } else res.json({ result: false, content: 'email' });
  } catch (err) {
    next(err);
  }
});

router.post('/authorization', authMiddleware, async (req, res, next) => {
  try {
    // 유효한 토큰이 존재하는 경우
    const idToBinary = Buffer.from(req.verifyTokenResult.userId, 'hex');
    const [rows, fields] = await (
      await db
    ).execute(`SELECT name FROM users WHERE id = ${idToBinary.length > 0 ? 'UNHEX(?)' : '?'}`, [
      req.verifyTokenResult.userId,
    ]);

    res.json({ token: true, updated: true, userId: req.verifyTokenResult.userId, userName: rows[0].name });
  } catch (err) {
    next(err);
  }
});

router.get('/kakao', async (req, res, next) => {
  const code = req.query.code;
  try {
    const { data } = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REST_API_KEY_KAKAO}&redirect_uri=${process.env.REDIRECT_URL}&code=${code}&client_secret=${process.env.CLIENT_SECRET_KEY_KAKAO}`
    );
    const { access_token: accessTokenByKakao, expires_in } = data;

    const getUserInfo = async () => {
      const { data } = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
        headers: {
          Authorization: `Bearer ${accessTokenByKakao}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });
      return data;
    };

    const { id: kakaoId, connected_at, kakao_account } = await getUserInfo();

    const isInserted = await checkJoined('kakao', kakaoId);

    if (!isInserted) {
      const { profile, gender_needs_agreement, gender } = kakao_account;
      await (
        await db
      ).execute('INSERT INTO users (id, name, sex, marketing) VALUES (UNHEX(?),?,?,?)', [
        kakaoId,
        profile.nickname,
        gender_needs_agreement ? null : gender[0].toUpperCase(),
        'N',
      ]);
    }

    const accessToken = await createToken(kakaoId + '');
    const resultRedis = await tokenToRedis(kakaoId + '', accessToken);
    if (resultRedis) {
      res.cookie(`accessToken=${accessToken}; HttpOnly;`);
      res.redirect('http://localhost:3000');
    }
  } catch (err) {
    next(err);
  }
});

router.get('/naver', async (req, res, next) => {
  try {
    const { state, code, error } = req.query;
    if (error) throw new Error('naver');
    else if (state !== 'Healthsy_Test') throw new Error('naver: wrong access');
    else {
      const { data } = await axios.post(
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.CLIENT_KEY_NAVER}&client_secret=${process.env.CLIENT_SECRET_KEY_NAVER}&code=${code}&state=${process.env.STATE}`
      );
      const { access_token: accessTokenByNaver, expires_in } = data;

      const getUserInfo = async () => {
        const { data } = await axios.get(`https://openapi.naver.com/v1/nid/me`, {
          headers: {
            Authorization: `Bearer ${accessTokenByNaver}`,
          },
        });
        return data;
      };

      const {
        response: { id: naverId, name, email, gender, mobile },
      } = await getUserInfo();
      const isInserted = await checkJoined('naver', naverId);

      if (!isInserted) {
        await (
          await db
        ).execute('INSERT INTO users (id, email, name, phone, sex, marketing) VALUES (?,?,?,?,?,?)', [
          naverId,
          email,
          name,
          mobile,
          gender,
          'N',
        ]);
      }
      const accessToken = await createToken(naverId);
      const resultRedis = await tokenToRedis(naverId, accessToken);
      if (resultRedis) {
        res.cookie(`accessToken=${accessToken}; HttpOnly;`);
        res.redirect('http://localhost:3000');
      }
    }
  } catch (err) {
    next(err);
  }
});

router.get('/google', async (req, res, next) => {
  try {
    const { state, code } = req.query;
    // 사용자 요청이 맞는지 확인
    if (state === process.env.STATE) {
      const { data } = await axios.post(
        `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.CLIENT_KEY_GOOGLE}&client_secret=${process.env.CLIENT_SECRET_KEY_GOOGLE}&redirect_uri=${process.env.REDIRECT_URL}/google&grant_type=authorization_code`,
        {
          headers: {
            'Content-Type': `application/x-www-form-urlencoded`,
          },
        }
      );

      const { access_token: accessTokenByGoogle, expires_in, scope, token_type, id_token, refresh_token } = data;

      const getUserInfo = async () => {
        const { data } = await axios.get(
          `https://openidconnect.googleapis.com/v1/userinfo?access_token=${accessTokenByGoogle}`
        );
        return data;
      };
      const { sub: googleId, name, email } = await getUserInfo();

      const isInserted = await checkJoined('google', googleId);

      if (!isInserted) {
        await (
          await db
        ).execute('INSERT INTO users (id, email, name, marketing) VALUES (UNHEX(?),?,?,?)', [
          googleId,
          email,
          name,
          'N',
        ]);
      }
      const accessToken = await createToken(googleId);
      const resultRedis = await tokenToRedis(googleId, accessToken);
      if (resultRedis) {
        res.cookie(`accessToken=${accessToken}; HttpOnly;`);
        res.redirect('http://localhost:3000');
      }
    } else throw new Error('google: wrong access');
  } catch (err) {
    next(err);
  }
});

router.post('/logout', authMiddleware, async (req, res, next) => {
  try {
    // 유효한 토큰이 존재하는 경우
    await deleteRedisValue(req.verifyTokenResult.userId);
    res.clearCookie('accessToken');
    res.end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
