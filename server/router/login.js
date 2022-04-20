const express = require('express');
const router = express.Router();
const db = require('../config-mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisClient = require('../config-redis');

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
          console.log('Jwt error!: ' + error);
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
      console.log(res);
      return true;
    })
    .catch((err) => {
      console.log(err);
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
      console.log(error);
    });
};

const verifyToken = async (token) => {
  return await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
      if (error) return reject(error);
      return resolve(user);
    });
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
            res.json({ result: true, content: accessToken });
          }
        }
        // 인증이 필요한 로직마다 인가헤더 추가해서 토큰 보내기
        else res.json({ result: false, content: 'password' });
      });
    } else res.json({ result: false, content: 'email' });
  });
});

router.post('/authorization', (req, res, next) => {
  const token = req.headers['authorization'].replace('Bearer ', '');
  if (token) {
    verifyToken(token)
      .then((result) => {
        const redisToken = getRedisValue(result.userId);
        if (redisToken === token) {
          res.json({
            result: true,
          });
          // 30분 초과x but 옛날 토큰
        } else {
          res.json({ result: false });
        }
      })
      // 30분 초과 or 애초에 생성되지 않은 토큰
      .catch((error) => {
        res.json({ result: false, content: error.message });
      });
  }
});

module.exports = router;
