const express = require('express');
const router = express.Router();
const db = require('../config');
const bcrypt = require('bcrypt');

router.use(express.json());

router.post('/', (req, res) => {
  const { email, password } = req.body;

  db.execute('SELECT * FROM users WHERE user_email = ?', [email], (error, result) => {
    if (error) console.log(error);
    else if (result.length === 1) {
      bcrypt.compare(password, result[0].user_password, (error, result) => {
        if (result) res.send('success');
        else res.send('password');
      });
    } else res.send('email');
  });
});

module.exports = router;
