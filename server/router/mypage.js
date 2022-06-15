const express = require('express');
const router = express.Router();
const db = require('../config-mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisClient = require('../config-redis');

router.post('/fetchUserInfo', async (req, res, next) => {
  const { userId } = await req.body;
  console.log(userId);

  db.execute(
    'SELECT email, password, name, phone, marketing, sex, zip_code, address FROM users WHERE id = UNHEX(?)',
    [userId],
    async (dbError, dbResult) => {
      if (dbError) next(dbError);
      else if (dbResult.length === 1) {
        res.json({ result: true, content: dbResult.result });
        // db에서 조회되지 않는 경우
      } else res.json({ result: false });
    }
  );
});

module.exports = router;
