const express = require('express');
const router = express.Router();
const db = require('../config-mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

router.post('/authentication', (req, res, next) => {
  const { email, password } = req.body;

  db.execute('SELECT id, password, name FROM users WHERE email = ?', [email], async (dbError, dbResult) => {
    if (dbError) next(dbError);
    else if (dbResult.length === 1) {
      bcrypt.compare(password, dbResult[0].password, async (bcryptError, bcryptResult) => {
        if (bcryptError) next(bcryptError);
        else if (bcryptResult) {
          const userId = dbResult[0].id.toString('hex');
          const accessToken = await createToken(userId);
          const resultRedis = await tokenToRedis(userId, accessToken);
          if (resultRedis) {
            res.cookie(`accessToken=${accessToken}; HttpOnly;`);
            res.json({ userId: userId, userName: dbResult[0].name, result: true, content: accessToken });
          }
        } // 비밀번호가 db에서 조회된 것과 같지 않는 경우
        else res.json({ result: false, content: 'password' });
      }); // 이메일이 db에서 조회되지 않는 경우
    } else res.json({ result: false, content: 'email' });
  });
});

router.post('/authorization', authMiddleware, async (req, res) => {
  // 유효한 토큰이 존재하는 경우
  res.json({ token: true, updated: true });
});

router.post('/logout', authMiddleware, async (req, res, next) => {
  try {
    // 유효한 토큰이 존재하는 경우
    await deleteRedisValue(req.verifyTokenResult.userId);
    res.clearCookie('accessToken');
    res.end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
