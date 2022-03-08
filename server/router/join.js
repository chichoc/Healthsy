require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../config');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

router.use(express.json());

router.post('/', async function (req, res) {
  const { email } = req.body;
  let userEmail = email;

  const transporter = nodemailer.createTransport({
    service: 'naver',
    port: 587,
    host: 'smtp.naver.com',
    // secure: false,
    // requireTLS: true,
    auth: {
      user: 'kny6152@naver.com',
      pass: process.env.TRANSPORTER_AUTH_PASSWORD,
    },
  });

  var message = {
    from: 'kny6152@naver.com',
    to: userEmail,
    subject: 'Message title',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>',
  };

  transporter.sendMail(message, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log('전송 완료 ' + result.response);
    }
  });
});

router.post('/dataInsert', (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = (password) => {
    return crypto.createHash('sha512').update(password).digest('base64');
  };

  db.execute('INSERT INTO users (email, password) VALUES (?,?)', [email, password], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Data Inserted');
    }
  });
});

module.exports = router;
