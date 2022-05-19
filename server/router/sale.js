require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../config-mysql');
const fs = require('fs');

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const DataToDb = async () => {
  const apiData = await getApiData(1, 1000);
  apiData.map((product) => {
    const keyWordRaw = product.RAWMTRL_NM.replace(/\(.*?\)/g, '');
    // null 또는 undefined가 있으면 값 넣어줘야 함
    db.execute(
      'INSERT INTO products (prod_id, prod_api, prod_raw) VALUES (?,?,?)',
      [Number(product.PRDLST_REPORT_NO), product, keyWordRaw],
      (error, result) => {
        if (error) console.log(error);
      }
    );
  });
  console.log('DataToDb: success');
};

const setApiUrl = (serviceId, startIdx, endIdx) => {
  const apiUrlPath = [process.env.OPEN_API_KEY, serviceId, 'json', startIdx, endIdx];
  const apiUrl = new URL(apiUrlPath.join('/'), 'http://openapi.foodsafetykorea.go.kr/api/');
  return apiUrl.href;
};

const getApiData = async (startNum, endNum, item) => {
  let array = [];
  try {
    // 데이터 요청은 한번에 최대 1,000건
    const reqCount = Math.ceil((endNum - startNum + 1) / 1000);
    for (let count = 0; count < reqCount; count++) {
      const reqStartNum = startNum + 1000 * count;
      let reqEndNum;
      count === reqCount - 1
        ? (reqEndNum = startNum + 1000 * count + ((endNum - startNum) % 1000))
        : (reqEndNum = startNum + 1000 * (count + 1) - 1);
      const requestApiUrl = setApiUrl('C003', reqStartNum, reqEndNum);
      // 현재 진행 중인 요청 url
      console.log(requestApiUrl);
      const apiResponse = await axios.get(requestApiUrl);
      // 원하는 항목이 있으면 해당하는 데이터만 배열로
      if (item) {
        await apiResponse.data.C003.row.map((product) => {
          array.push(product[item]);
        });
      }
      // 아니면 전체 데이터를 합침
      else apiData = [...apiResponse.data.C003.row];
      await sleep(2000);
    }
  } catch (error) {
    console.log(error);
  }
  return item ? array : apiData;
};

const isDuplicate = async (array) => {
  const result = await array.some((elem) => {
    return array.indexOf(elem) !== array.lastIndexOf(elem);
  });
  return result;
};

// PRDLST_REPORT_NO 중복 여부 확인 후 PK 설정 및 최대자릿수로 datatype 설정
const checkPk = async () => {
  apiDataArray = await getApiData(1, 3000, 'PRDLST_REPORT_NO');
  const lengthArray = await apiDataArray.map((pk) => pk.length);
  console.log(apiDataArray.length, await isDuplicate(apiDataArray), Math.max(...lengthArray));
};

const checkBrand = async () => {
  const apiDataArray = await getApiData(1, 3000, 'BSSH_NM');
  const result = apiDataArray.reduce((allBrands, brand) => {
    if (brand in allBrands) allBrands[brand]++;
    else allBrands[brand] = 1;
    return allBrands;
  }, {});
  console.log(result, Object.keys(result).length);
  // {
  //   '고려인삼과학주식회사': 78,
  //   '(주)비피도': 127,
  //   '(주)일화': 150,
  //   '주식회사 네추럴웨이': 75,
  //   '(주)유유헬스케어': 449,
  //   '강원인삼농협': 17,
  //   '(주)고센바이오텍': 17,
  //   '(주)허브큐어': 282,
  //   '(주)파시코': 12,
  //   '(주)진생사이언스': 3,
  //   '(주)화인내츄럴': 63,
  //   '주식회사한미양행': 816,
  //   '(주)팜텍코리아': 71,
  //   '포천인삼영농조합법인': 15,
  //   '(재)춘천바이오산업진흥원': 3,
  //   '주)팜크로스': 321,
  //   '경성제약주식회사': 40,
  //   '삼아제약주식회사': 5,
  //   '(주)화진바이오코스메틱': 34,
  //   '(주)삼진GNF': 36,
  //   '(주)이롬': 3,
  //   '개성인삼농협': 11,
  //   '(주)백천바이오텍(biotech)': 8,
  //   '(주)청우식품': 2,
  //   '디에이치팜(주)': 21,
  //   '주식회사 굿씨드': 16,
  //   '일동후디스주식회사': 1,
  //   '(주)하티': 9,
  //   '(주)메디언스': 30,
  //   '주식회사비엠제약': 2,
  //   '주식회사웰파인': 12,
  //   '(주)한국인삼공사': 57,
  //   '농업회사법인지에이치내츄럴': 15,
  //   '(주)바이오션': 9,
  //   '드림바이오(주)': 5,
  //   '주식회사 대웅생명과학': 2,
  //   '(주)한국지네틱팜': 6,
  //   '(주)휴온스푸디언스': 9,
  //   '(주)바이오 로제트': 61,
  //   '주식회사 웰빙엘에스': 4,
  //   '(주)프로게이너': 25,
  //   '농업회사법인(주)개성상인': 52,
  //   '(주)팜투팜2공장': 17,
  //   '(주)빈스힐': 1,
  //   '(주)바이오시네틱스 제1공장': 1,
  //   '주식회사 네추럴웨이 포천 제2공장': 7
  // }
};

const checkFN = async (array) => {
  const circledNumbers = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];
  array = await getApiData(1, 10, 'PRIMARY_FNCLTY');
  const keyWordFn = array.map((func) => {
    const splitStr = ['\r\n', ' ', ...circledNumbers];
    for (const str of splitStr) {
      func = func.split(str);
    }
  });
  console.log(keyWordFn);
};

const getFN = async () => {
  let data = await getApiData(1, 1000, 'PRIMARY_FNCLTY');
  const dataJSON = JSON.stringify(data);
  fs.writeFileSync('FN.json', dataJSON);
};

const sortedRaw = async () => {
  const apiDataRaw = await getApiData(1, 3000, 'RAWMTRL_NM');
  const keyWordRaw = apiDataRaw.map((raw) => raw.replace(/\(.*?\)/g, ''));
  //   prod_raw 최대자릿수로 datatype 설정: 2843
  console.log(Math.max(...(await keyWordRaw.map((raw) => raw.length))));
};

// checkPk();
checkBrand();
// checkFN();
// getFN();
// DataToDb();

router.post('/getApiData', async (req, res, next) => {
  const { startIdx, endIdx } = await req.body;
  db.execute(
    'SELECT prod_id, prod_api->"$.PRDLST_NM" as PRDLST_NM, prod_api->"$.BSSH_NM" as BSSH_NM, prod_price, prod_stock FROM products limit ?,?',
    [startIdx, endIdx],
    (error, result) => {
      if (error) next(error);
      else res.send(result);
    }
  );
});

module.exports = router;
