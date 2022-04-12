const express = require('express');
const router = express.Router();
const db = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const { promisify } = require('util');

const createToken = (id, email) => {
  jwt.sign(
    { userId: id, userEmail: email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '30m',
    },
    (error, token) => {
      if (error) console.log('Jwt error!: ' + error);
      return token;
    }
  );
};

const tokenToRedis = async (id, token) => {
  const redisClient = redis.createClient();
  redisClient.on('error', (error) => console.log('Redis Client Error', error));
  const setAsync = promisify(redisClient.set).bind(redisClient);
  await setAsync(id, token);
  // redisClient.set(id, token, (error, reply) => {
  //   if (error) console.log(error);
  //   console.log(reply);
  // });
};

const verityToken = (token) => {
  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) console.log(error);
  });
};

router.post('/', (req, res, next) => {
  const { email, password } = req.body;
  // access 토큰이 존재 & 유효한지
  // 토큰이 없거나 유효햐지 않다면 로그인 유도 (리다이렉트)

  db.execute('SELECT * FROM users WHERE user_email = ?', [email], (error, dbResult) => {
    if (error) next('db execute error: ' + error);
    else if (dbResult.length === 1) {
      res.send('success');
      bcrypt.compare(password, dbResult[0].user_password, (error, bcryptResult) => {
        if (bcryptResult) {
          const userId = dbResult[0].user_id.toString('hex');
          const accessToken = createToken(userId, dbResult[0].user_email);
          tokenToRedis(userId, accessToken);
        }
        // 인증이 필요한 로직마다 인가헤더 추가해서 토큰 보내기
        else res.send('password');
      });
    } else res.send('email');
  });
});

module.exports = router;
