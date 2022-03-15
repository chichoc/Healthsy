require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../config');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer');

router.use(express.json());

router.post('/sendEmail', function (req, res) {
  const { email } = req.body;
  let userEmail = email;
  let verifyCode = Math.floor(Math.random() * 1000000);

  const transporter = nodemailer.createTransport({
    service: 'naver',
    port: 587,
    host: 'smtp.naver.com',
    secure: false,
    auth: {
      user: 'kny6152@naver.com',
      pass: process.env.TRANSPORTER_AUTH_PASSWORD,
    },
  });

  const message = {
    from: 'kny6152@naver.com',
    to: userEmail,
    subject: 'Healthsy 인증번호 입니다.',
    text: `아래 인증번호를 제한 시간 내로 입력해주세요. \n ${verifyCode} `,
  };

  transporter.sendMail(message, function (error, result) {
    if (error) console.log(error);
    else console.log('전송 완료 ' + result.response);
  });
  res.send({ sendVerifyCode: verifyCode });
});

router.post('/duplicateEmail', function (req, res) {
  db.execute('SELECT * FROM users WHERE user_email=?', req.body.email, (error, result) => {
    if (error) console.log(error);
    else res.send('Email existed!', result);
  });
});

router.post('/dataInsert', (req, res) => {
  const { email, password, name, phone, checkMarketing } = req.body;

  checkMarketing ? (marketing = 'Y') : (marketing = 'N');

  let joinDate = new Date().toISOString().slice(0, 10);

  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      db.execute(
        'INSERT INTO users (user_email, user_password, user_name, user_phone, user_marketing, user_join_date) VALUES (?,?,?,?,?,?)',
        [email, hash, name, phone, marketing, joinDate],
        (error, result) => {
          if (error) console.log(error);
          else {
            res.send('success');
            console.log(result);
          }
        }
      );
    })
    .catch((error) => console.log(error));
});

module.exports = router;
