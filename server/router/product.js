require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../config-mysql');
const multer = require('multer');
const upload = multer({ dest: './uploads' });

router.post('/fetchProduct', async (req, res, next) => {
  const { productId } = await req.body;

  const [rows, fields] = await (
    await db
  ).execute(
    'SELECT id, brand, api->"$.PRDLST_NM" as PRDLST_NM, price, api->"$.PRDT_SHAP_CD_NM" as PRDT_SHAP_CD_NM, raw_material, stock FROM products where id = ?',
    [productId]
  );

  res.send(rows);
});

router.use('/file', express.static('./uploads'));
router.post('/addReview', upload.single('file'), async (req, res, next) => {
  const { userId, productId, selectedScore, content } = await req.body;
  let photo;

  if (req.file) {
    photo = 'http://localhost:8888/file/' + req.file.filename;
  }

  let executeSql = `INSERT INTO reviews (prod_id, user_id, score, content` + (!req.file ? `) ` : `, photo) `);

  executeSql += `VALUES (${productId}, UNHEX(?), ${selectedScore}, '${content}'` + (!req.file ? `)` : `, '${photo}')`);

  const [rows, fields] = await (await db).execute(executeSql, [userId]);
  if (rows.affectedRows === 1) {
    res.json({ addReview: true });
  }
});

router.post('/countReviews', async (req, res, next) => {
  const { productId } = await req.body;

  const [result, fields] = await (
    await db
  ).execute(
    `SELECT count(*) as reviews, truncate(avg(reviews.score),1) as score 
    FROM reviews 
    WHERE prod_id = ?`,
    [productId]
  );

  res.json({ result });
});

router.post('/fetchReviews', async (req, res, next) => {
  const { productId, pageNumDiffer, sort } = await req.body;
  let { cursorIdx } = await req.body;

  const executeSql = `SELECT reviews.id, users.name, reviews.score, reviews.content, reviews.photo, reviews.thumbs_up as thumbsUp, date_format(reviews.reg_date,"%Y.%m.%d.") as date 
  FROM reviews join users on reviews.user_id = users.id WHERE prod_id = ? `;

  const sortSql = 'ORDER BY reviews.id DESC limit 10';

  for await (const i of [...Array(Math.abs(pageNumDiffer)).keys()]) {
    let conditionalSql = '';

    if (cursorIdx) {
      conditionalSql = pageNumDiffer > 0 ? `and reviews.id < ${cursorIdx} ` : `and reviews.id > ${cursorIdx} `;
    }

    const [result, fields] = await (await db).execute(executeSql + conditionalSql + sortSql, [productId]);

    if (i === pageNumDiffer - 1) {
      res.json({ result });
    } else {
      const lastReviewIndex = result.length - 1;
      cursorIdx = pageNumDiffer > 0 ? result[lastReviewIndex].id : result[0].id;
    }
  }
});

router.post('/addReviewThumbs', async (req, res, next) => {
  const { reviewId, thumbs, sign } = await req.body;

  const executeSql = `UPDATE reviews SET thumbs_${thumbs} = reviews.thumbs_${thumbs} ${sign} 1 WHERE id=?`;

  await (await db).execute(executeSql, [reviewId]);

  if (thumbs === 'up') {
    const [rows, fields] = await (
      await db
    ).execute('SELECT id, thumbs_up as thumbsUp FROM reviews WHERE id = ?', [reviewId]);
    res.json({ rows });
  } else {
    res.json();
  }
});

module.exports = router;
