require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../config-mysql');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/fetchProduct', async (req, res, next) => {
  const { productId } = await req.body;

  const columnNames = [
    'LCNS_NO',
    'BSSH_NM',
    'PRDLST_REPORT_NO',
    'PRDLST_NM',
    'PRMS_DT',
    'POG_DAYCNT',
    'DISPOS',
    'NTK_MTHD',
    'PRIMARY_FNCLTY',
    'IFTKN_ATNT_MATR_CN',
    'CSTDY_MTHD',
    'STDR_STND',
    'CRAWMTRL_NM',
    'CRET_DTM',
    'LAST_UPDT_DTM',
    'PRDT_SHAP_CD_NM',
  ];
  let executeSql =
    'SELECT p.id, p.brand, p.price, p.raw_material, p.status, count(r.id) as count, truncate(avg(r.score), 1) as score';
  columnNames.forEach((column) => (executeSql += `, api->"$.${column}" as ${column} `));
  executeSql += 'FROM products p LEFT OUTER JOIN reviews r ON p.id = r.prod_id WHERE p.id = ? GROUP BY p.id';

  const [rows, fields] = await (await db).execute(executeSql, [productId]);
  res.send(rows);
});

router.post('/fetchReviews', async (req, res, next) => {
  const { productId, pageNumDiffer, sort, cursorIdx } = await req.body;

  const joinSql = `SELECT r.id, users.name, r.score, r.content, r.image, r.thumbs_up as thumbsUp, r.thumbs_down as thumbsDown, date_format(r.reg_date,"%Y.%m.%d.") as date 
  FROM reviews r 
  JOIN users
  ON r.prod_id = ${productId} AND r.user_id = users.id `;

  const conditionalSql = cursorIdx
    ? 'WHERE ' + (pageNumDiffer > 0 ? `r.id < ${cursorIdx}` : `r.id > ${cursorIdx}`)
    : '';

  const firstIdx = (Math.abs(pageNumDiffer) - 1) * 10;
  let orderSql = ' ORDER BY ';
  switch (sort) {
    case 'thumbsUp':
      orderSql += 'thumbsUp DESC,';
      break;
    case 'highScores':
      orderSql += 'r.score DESC,';
      break;
    case 'lowScores':
      orderSql += 'r.score ASC,';
      break;
  }
  orderSql += `r.id ${cursorIdx && pageNumDiffer < 0 ? 'ASC' : 'DESC'} limit ${firstIdx}, 10`;

  const [rows, fields] = await (await db).execute(joinSql + conditionalSql + orderSql, [productId]);

  res.json(cursorIdx && pageNumDiffer < 0 ? rows.reverse() : rows);
});

router.use('/photo', express.static('./uploads'));
router.post('/addReview', upload.single('file'), async (req, res, next) => {
  const { userId, productId, selectedScore, content } = await req.body;
  let photoPath;

  if (req.file) {
    photoPath = 'http://localhost:8888/photo/' + req.file.filename;
  }

  let executeSql = `INSERT INTO reviews (prod_id, user_id, score, content` + (!req.file ? `) ` : `, photo) `);

  executeSql +=
    `VALUES (${productId}, UNHEX(?), ${selectedScore}, '${content}'` + (!req.file ? `)` : `, '${photoPath}')`);

  const [rows, fields] = await (await db).execute(executeSql, [userId]);
  if (rows.affectedRows === 1) {
    res.json({ addReview: true });
  }
});

router.post('/addReviewThumbs', async (req, res, next) => {
  const { reviewId, typeOfThumbs, capitalizedTypeOfThumbs, sign } = await req.body;

  const updateSql = `UPDATE reviews SET thumbs_${typeOfThumbs} = reviews.thumbs_${typeOfThumbs} ${sign} 1 WHERE id=?`;

  await (await db).execute(updateSql, [reviewId]);

  const [rows, fields] = await (
    await db
  ).execute(`SELECT id, thumbs_${typeOfThumbs} as thumbs${capitalizedTypeOfThumbs} FROM reviews WHERE id = ?`, [
    reviewId,
  ]);
  res.json({ ...rows });
});

router.post('/changeKeyBtnsOfProdut', async (req, res, next) => {
  try {
    const { type, userId, productId } = req.body;

    const addTypeOfBtn = async () => {
      const insertionQuery = `INSERT INTO ${type}s (user_id, prod_id) VALUES (UNHEX(?), ${productId})`;
      console.log(insertionQuery);
      await (await db).execute(insertionQuery, [userId]);
      return true;
    };

    const removeTypeOfBtn = async () => {
      const deletionQuery = `DELETE FROM ${type}s WHERE user_id = UNHEX(?) AND prod_id = ${productId}`;
      console.log(deletionQuery);
      await (await db).execute(deletionQuery, [userId]);
      return false;
    };
    // 추가,삭제 버튼이 따로 존재하지 않고 토글 형식이라 실시간 현황이 아닐 수 있으므로 관심상품 여부 다시 조회
    const [rowToCheck, _] = await (
      await db
    ).execute(
      `SELECT count(${type}s.id) as isAdded FROM ${type}s WHERE user_id = UNHEX(?) AND prod_id = ${productId}`,
      [userId]
    );

    const isAdded = rowToCheck[0].isAdded ? await removeTypeOfBtn() : await addTypeOfBtn();

    if (type === 'comparing') res.json({ isAdded });
    else {
      const [rowsToCount, fields] = await (
        await db
      ).execute(`SELECT count(*) as count FROM ${type}s WHERE prod_id = ${productId}`);

      res.json({ isAdded, count: rowsToCount[0].count });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/fetchKeyBtnsOfProdut', async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    const [rowToCheck, _] = await (
      await db
    ).execute(
      `SELECT
      (SELECT count(bookmarks.id) FROM bookmarks WHERE user_id = UNHEX(?) AND prod_id = ${productId}) as bookmark,
      (SELECT count(comparings.id) FROM comparings WHERE user_id = UNHEX(?) AND prod_id = ${productId}) as comparing,
      (SELECT count(takings.id) FROM takings WHERE user_id = UNHEX(?) AND prod_id = ${productId}) as taking`,
      [userId, userId, userId]
    );

    const [rowsToCount, fields] = await (
      await db
    ).execute(
      `SELECT
      (SELECT count(bookmarks.id) FROM bookmarks WHERE prod_id = ${productId}) as bookmark,
      (SELECT count(takings.id) FROM takings WHERE prod_id = ${productId}) as taking`
    );

    res.json({ isAdded: rowToCheck[0], count: rowsToCount[0] });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
