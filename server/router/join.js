const express = require('express');
const router = express.Router();
const db = require('../config');
const crypto = require('crypto');
const util = require('util');

router.use(express.json());

const hashedPassword = (password) => {
  return crypto.createHash('sha512').update(password).digest('base64');
};

router.post('/join', (req, res) => {
  const { email, password } = req.body;

  db.execute('INSERT INTO users (email, password) VALUES (?,?)', [email, password], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Data Inserted');
    }
  });
});

module.exports = router;
