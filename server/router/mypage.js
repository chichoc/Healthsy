const express = require('express');
const router = express.Router();
const db = require('../config-mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
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
      (cursorIdx ? ` WHERE ` + (+pageNumDiffer > 0 ? `b.id < ${cursorIdx}` : `b.id > ${cursorIdx}`) : '') +
      ` GROUP BY p.id, b.id `;

    const firstIdx = (Math.abs(pageNumDiffer) - 1) * 9;
    const orderQuery = `ORDER BY b.id ${cursorIdx && pageNumDiffer < 0 ? 'ASC' : 'DESC'} LIMIT ${firstIdx}, 9`;
    const [rows, fields] = await (await db).execute(joinQuery + conditionalQuery + orderQuery, [userId]);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.post('/fetchComparings', async (req, res, next) => {
  try {
    const { userId } = req.body;

    const joinQuery = `SELECT c.id as comparingsId, p.id, p.api->"$.PRDLST_NM" as PRDLST_NM, p.brand, p.status
    FROM products p
    INNER JOIN comparings c
    ON c.user_id = UNHEX(?) AND p.id = c.prod_id`;

    const orderQuery = ` ORDER BY c.id DESC`;

    const [rows, fields] = await (await db).execute(joinQuery + orderQuery, [userId]);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});
router.post('/fetchSelectedComparing', async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    const columnNames = [
      'LCNS_NO',
      'BSSH_NM',
      'PRDT_SHAP_CD_NM',
      'DISPOS',
      'STDR_STND',
      'NTK_MTHD',
      'IFTKN_ATNT_MATR_CN',
      'CSTDY_MTHD',
      'POG_DAYCNT',
      'RAWMTRL_NM',
      'PRDLST_NM',
      'PRIMARY_FNCLTY',
      'PRMS_DT',
      'CRET_DTM',
      'LAST_UPDT_DTM',
    ];

    let joinQuery = `SELECT c.id as comparingsId, p.id, p.brand, p.price, p.raw_material, p.status, count(r.id) as count, truncate(avg(r.score), 1) as score`;

    columnNames.forEach((column) => (joinQuery += `, p.api->"$.${column}" as ${column}`));

    joinQuery += ` FROM products p 
    INNER JOIN comparings c 
    ON c.user_id = UNHEX(?) AND p.id = c.prod_id AND p.id = ${productId}
    LEFT JOIN reviews r
    ON c.prod_id = r.prod_id
    GROUP BY c.id, p.id`;

    const [rows, fields] = await (await db).execute(joinQuery, [userId]);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.post('/removeComparing', async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    const deleteQuery = `DELETE FROM comparings WHERE user_id = UNHEX(?) AND prod_id = ${productId}`;

    await (await db).execute(deleteQuery, [userId]);

    const selectQuery = `SELECT c.id as comparingsId, p.id, p.api->"$.PRDLST_NM" as PRDLST_NM, p.brand, p.status
    FROM products p
    INNER JOIN comparings c
    ON c.user_id = UNHEX(?) AND p.id = c.prod_id 
    ORDER BY c.id DESC`;

    const [rows, fields] = await (await db).execute(selectQuery, [userId]);

    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.post('/fetchTakings', async (req, res, next) => {
  try {
    const { userId } = req.body;

    let joinQuery = `SELECT t.id as takingsId, p.id, p.api->"$.PRDLST_NM" as PRDLST_NM, p.brand, p.status
    `;

    const columnNames = ['STDR_STND', 'IFTKN_ATNT_MATR_CN', 'POG_DAYCNT'];
    columnNames.forEach((column) => (joinQuery += `, p.api->"$.${column}" as ${column}`));

    joinQuery += ` FROM products p
    INNER JOIN takings t
    ON t.user_id = UNHEX(?) AND p.id = t.prod_id
    ORDER BY t.id DESC`;

    const [rows, fields] = await (await db).execute(joinQuery, [userId]);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.post('/removeTaking', async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    const deleteQuery = `DELETE FROM takings WHERE user_id = UNHEX(?) AND prod_id = ${productId}`;

    await (await db).execute(deleteQuery, [userId]);

    const selectQuery = `SELECT t.id as takingsId, p.id, p.api->"$.PRDLST_NM" as PRDLST_NM, p.brand, p.status
    FROM products p
    INNER JOIN takings t
    ON t.user_id = UNHEX(?) AND p.id = t.prod_id 
    ORDER BY t.id DESC`;

    const [rows, fields] = await (await db).execute(selectQuery, [userId]);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.post('/counthUserReviews', async (req, res, next) => {
  const { userId } = await req.body;

  const [rows, fields] = await (
    await db
  ).execute(
    `SELECT count(id) as count
    FROM reviews
    WHERE user_id = UNHEX(?)`,
    [userId]
  );

  res.json(rows[0]);
});
router.post('/fetchUserReviews', async (req, res, next) => {
  try {
    const { userId, pageNumDiffer, cursorIdx } = await req.body;

    const joinQuery = `SELECT r.id as reviewId, p.id as productId, p.api->"$.PRDLST_NM" as PRDLST_NM, p.brand, p.status, r.score, r.content, r.thumbs_up as thumbsUp, r.thumbs_down as thumbsDown, date_format(r.reg_date,"%Y.%m.%d.") as date
    FROM products p
    INNER JOIN reviews r
    ON r.user_id = UNHEX(?) AND p.id = r.prod_id`;

    const conditionalQuery = cursorIdx
      ? ` WHERE ` + (+pageNumDiffer > 0 ? `r.id < ${cursorIdx} ` : `r.id > ${cursorIdx} `)
      : ' ';

    const firstIdx = (Math.abs(pageNumDiffer) - 1) * 10;
    const orderQuery = `ORDER BY r.id ${cursorIdx && pageNumDiffer < 0 ? 'ASC' : 'DESC'} LIMIT ${firstIdx}, 10`;


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
    'SELECT email, name as userName, phone, sex, zip_code as zipCode, address, detailed_address as detailedAddress, marketing as checkMarketing FROM users WHERE id = UNHEX(?)',
    [userId]
  );

  res.json(rows[0]);
});

router.post('/updateUserInfo', async (req, res, next) => {
  try {
    const { userId, password, ...dataToEdit } = req.body;

    const comparePw = async () => {
      const [selectRow, selectFields] = await (
        await db
      ).execute('SELECT password FROM users WHERE id = UNHEX(?)', [userId]);
      return await new Promise((resolve, reject) => {
        bcrypt.compare(password, selectRow[0].password, (bcryptError, bcryptResult) => {
          if (bcryptError) return reject(bcryptError);
          return resolve(bcryptResult);
        });
      });
    };

    if (password && !(await comparePw())) return res.json({ result: false, content: 'password' });

    let updateQuery = 'UPDATE users SET ';

    for (let [index, [key, value]] of Object.entries(dataToEdit).entries()) {
      if (['newPassword', 'sex', 'checkMarketing'].some((keyToChangeValue) => key === keyToChangeValue)) {
        switch (key) {
          case 'newPassword':
            value = await bcrypt.hash(value, saltRounds);
            break;
          case 'sex':
            value = value[0].toUpperCase();
            break;
          case 'checkMarketing':
            value = value ? 'Y' : 'N';
        }
      }
      if (/[A-Z]/.test(key)) {
        switch (key) {
          case 'userName':
            key = 'name';
          case 'zipCode':
            key = 'zip_code';
            break;
          case 'detailedAddress':
            key = 'detailed_address';
            break;
          case 'checkMarketing':
            key = 'marketing';
            break;
          case 'verificatedEmail':
            key = 'email';
            break;
          case 'newPassword':
            key = 'password';
        }
      }
      updateQuery += `${index > 0 ? ',' : ''} ${key} = '${value}'`;
    }

    await (await db).execute(updateQuery + ' WHERE id = UNHEX(?)', [userId]);

    const [rows, fields] = await (
      await db
    ).execute(
      'SELECT email, name as userName, phone, sex, zip_code as zipCode, address, detailed_address as detailedAddress, marketing as checkMarketing FROM users WHERE id = UNHEX(?)',
      [userId]
    );

    res.json({ result: true, updatedData: rows[0] });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
