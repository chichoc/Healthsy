const express = require('express');
const router = express.Router();
const db = require('../config-mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisClient = require('../config-redis');

router.post('/fetchUserInfo', async (req, res, next) => {
  const { userId } = await req.body;
  console.log(userId);

  const [rows, fields] = await (
    await db
  ).execute(
    'SELECT email, password, name as userName, phone, sex, zip_code as zipCode, address, detailed_address as detailedAddress, marketing as checkMarketing FROM users WHERE id = UNHEX(?)',
    [userId]
  );

  res.json(rows);
});

module.exports = router;
