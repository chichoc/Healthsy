const express = require('express');
const router = express.Router();
const db = require('../config');
const bcrypt = require('bcrypt');

router.post('/', (req, res, next) => {
  const { email, password } = req.body;

  db.execute('SELECT * FROM users WHERE user_email = ?', [email], (error, result) => {
    if (error) next(error);
    else if (result.length === 1) {
      bcrypt.compare(password, result[0].user_password, (error, result) => {
        if (result) res.send('success');
        else res.send('password');
      });
    } else res.send('email');
  });
});

module.exports = router;
