const express = require('express');
const router = express.Router();
const db = require('../config');

router.use(express.json());

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
    if (err) console.log(err);

    if (result.email.length > 0) {
      res.send(result);
      console.log('로그인 완료');
    } else res.send('잘못된 로그인입니다!');
  });
});

module.exports = router;
