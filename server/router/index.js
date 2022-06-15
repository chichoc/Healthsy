const express = require('express');
const router = express.Router();

const JoinRouter = require('./join');
const LoginRouter = require('./login');
const SaleRouter = require('./sale');
const ProductRouter = require('./product');
const MyPageRouter = require('./mypage');

router.use('/join', JoinRouter);
router.use('/login', LoginRouter);
router.use('/sale', SaleRouter);
router.use('/product', ProductRouter);
router.use('/mypage', MyPageRouter);

module.exports = router;
