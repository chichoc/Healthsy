const express = require('express');
const router = express.Router();
const db = require('../config-mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisClient = require('../config-redis');

const getCookie = (cookie, name) => {
  if (cookie) {
    const cookieValue = cookie.split('; ').find((row) => row.startsWith(name));
    if (cookieValue) {
      // access token인 경우
      return cookieValue.split('=')[1];
    }
    // token이 있지만 access token이 아닌 경우
    return cookieValue;
  } // 어떠한 token도 없는 경우
  else return cookie;
};

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

const verifyToken = async (token) => {
  return await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
      if (error) return reject(error);
      return resolve(decoded);
    });
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

const getRedisValue = async (key) => {
  return await redisClient
    .get(key)
    .then((value) => {
      return value;
    })
    .catch((error) => {
      console.log(`getRedisValue error!: ${error}`);
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

router.post('/authentication', (req, res, next) => {
  const { email, password } = req.body;

  db.execute('SELECT user_id, user_password FROM users WHERE user_email = ?', [email], async (dbError, dbResult) => {
    if (dbError) next('db execute error: ' + dbError);
    else if (dbResult.length === 1) {
      bcrypt.compare(password, dbResult[0].user_password, async (bcryptError, bcryptResult) => {
        if (bcryptError) next('bcrypt error: ' + bcryptError);
        else if (bcryptResult) {
          const userId = dbResult[0].user_id.toString('hex');
          const accessToken = await createToken(userId);
          const resultRedis = await tokenToRedis(userId, accessToken);
          if (resultRedis) {
            res.cookie(`accessToken=${accessToken}; HttpOnly;`);
            res.json({ result: true, content: accessToken });
          }
        } // 비밀번호가 db에서 조회된 것과 같지 않는 경우
        else res.json({ result: false, content: 'password' });
      }); // 이메일이 db에서 조회되지 않는 경우
    } else res.json({ result: false, content: 'email' });
  });
});

// 인증이 필요한 로직마다 인가헤더 추가해서 토큰 보내기
router.post('/authorization', async (req, res, next) => {
  if (req.headers.cookie) {
    const reqToken = getCookie(req.headers.cookie, 'accessToken');
    if (reqToken) {
      // 토큰이 존재하는 경우
      try {
        const verifyTokenResult = await verifyToken(reqToken);
        const redisToken = await getRedisValue(verifyTokenResult.userId);
        if (redisToken === reqToken) res.json({ token: true, updated: true });
        // 30분 초과x but 옛날 토큰
        else res.json({ token: true, updated: false });
      } catch (error) {
        // 30분 초과 or 애초에 생성되지 않는 토큰
        res.json({ token: true, updated: false, content: error.message });
      }
    }
  } else {
    // 토큰이 존재하지 않는 경우
    res.json({ token: false });
  }
});

router.post('/logout', async (req, res) => {
  const reqToken = getCookie(req.headers.cookie, 'accessToken');
  res.clearCookie('accessToken');
  // 토큰이 존재할 수 밖에 없음
  try {
    const verifyTokenResult = await verifyToken(reqToken);
    const redisToken = await getRedisValue(verifyTokenResult.userId);
    if (redisToken === reqToken) {
      await deleteRedisValue(verifyTokenResult.userId);
      res.clearCookie('accessToken');
      res.json({});
    } else {
      // 30분 초과x but 옛날 토큰
      res.json({});
    }
  } catch (error) {
    // 30분 초과 or 애초에 생성되지 않은 토큰
    res.json({});
  }
});

module.exports = router;
