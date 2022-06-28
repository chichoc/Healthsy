require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../config-mysql');

router.post('/addReview', async (req, res, next) => {
  const { productId, userId, newScore, content } = await req.body;

  db.execute(
    'INSERT INTO reviews (prod_id, user_id, score, content) VALUES (?,UNHEX(?),?,?)',
    [productId, userId, newScore, content],
    (error, result) => {
      if (error) next(error);
      else if (result.affectedRows === 1) {
        res.json({ addReview: true });
      }
    }
  );
});

router.post('/countReviews', async (req, res, next) => {
  const { productId } = await req.body;

  db.execute(
    `SELECT count(*) as reviews, truncate(avg(reviews.score),1) as score 
    FROM reviews 
    WHERE prod_id = ?`,
    [productId],
    (error, result) => {
      if (error) next(error);
      else res.json({ result });
    }
  );
});

router.post('/getReviews', async (req, res, next) => {
  const { productId, prevIdx, sort } = await req.body;

  const executeSql = `SELECT reviews.id, users.name, reviews.score, reviews.content, reviews.thumbs_up as thumbsUp, date_format(reviews.reg_date,"%Y.%m.%d.") as date 
  FROM reviews join users on reviews.user_id = users.id  WHERE prod_id = ? `;

  const addExecuteSql =
    executeSql +
    (!prevIdx
      ? // 첫번쨰 페이지
        `ORDER BY reviews.id DESC limit 10`
      : `and reviews.id < ${prevIdx} ORDER BY reviews.id DESC limit 10`);

  db.execute(addExecuteSql, [productId], (error, result) => {
    if (error) next(error);
    else res.json({ result });
  });
});

module.exports = router;
