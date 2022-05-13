const express = require('express');
const router = express.Router();

const JoinRouter = require('./join');
const LoginRouter = require('./login');
const SaleRouter = require('./sale');

router.use('/join', JoinRouter);
router.use('/login', LoginRouter);
router.use('/sale', SaleRouter);

module.exports = router;
