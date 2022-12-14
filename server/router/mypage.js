const express = require('express');
const router = express.Router();
const db = require('../config-mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisClient = require('../config-redis');

router.post('/countBookmarks', async (req, res, next) => {
  const { userId } = await req.body;

  const [rows, fields] = await (
    await db
  ).execute(
    `SELECT count(id) as count
    FROM bookmarks
    WHERE user_id = UNHEX(?)`,
    [userId]
  );

  res.json(rows[0]);
});

router.post('/fetchBookmarks', async (req, res, next) => {
  try {
    const { userId, pageNumDiffer, cursorIdx } = req.body;

    const joinQuery = `SELECT b.id as bookmarksId, p.id, p.api->"$.PRDLST_NM" as PRDLST_NM, p.brand, p.price, p.status, count(r.id) as count, truncate(avg(r.score), 1) as score
    FROM products p
    INNER JOIN bookmarks b
    ON b.user_id = UNHEX(?) AND p.id = b.prod_id
    LEFT JOIN reviews r
    ON b.prod_id = r.prod_id`;

    const conditionalQuery =
      (cursorIdx && ` WHERE ` + (+pageNumDiffer > 0 ? `b.id < ${cursorIdx}` : `b.id > ${cursorIdx}`)) +
      ` GROUP BY p.id, b.id `;

    const firstIdx = (Math.abs(pageNumDiffer) - 1) * 9;
    const orderQuery = `ORDER BY b.id ${cursorIdx && pageNumDiffer < 0 ? 'ASC' : 'DESC'} LIMIT ${firstIdx}, 9`;
    console.log(joinQuery + conditionalQuery + orderQuery);
    const [rows, fields] = await (await db).execute(joinQuery + conditionalQuery + orderQuery, [userId]);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.post('/fetchUserInfo', async (req, res, next) => {
  const { userId } = await req.body;

  const [rows, fields] = await (
    await db
  ).execute(
    'SELECT email, password, name as userName, phone, sex, zip_code as zipCode, address, detailed_address as detailedAddress, marketing as checkMarketing FROM users WHERE id = UNHEX(?)',
    [userId]
  );

  res.json(rows);
});

module.exports = router;
