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

const checkRaw = async () => {
  const apiDataRaw = await getApiData(1, 3000, 'RAWMTRL_NM');
  const keyWordRaw = apiDataRaw.map((raw) => raw.replace(/\(.*?\)/g, ''));
  // prod_raw 최대자릿수로 datatype 설정: 2843
  console.log(Math.max(...(await keyWordRaw.map((raw) => raw.length))));
};

const sortObjectValue = async () => {
  const array = JSON.parse(fs.readFileSync('./db/map-nouns-to-count.json'));
  const sortedObject = Object.entries(array)
    .sort(([, a], [, b]) => a - b)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  console.log(sortedObject);
  // {
  //   '루테인': 0,
  //   '유지시': 0,
  //   '켜': 0,
  //   '주어': 0,
  //   '월': 0,
  //   '경전': 0,
  //   '변화': 0,
  //   '부편': 0,
  //   '스피루리나': 0,
  //   '은': 0,
  //   '초록': 0,
  //   '입': 0,
  //   '홍합': 0,
  //   '캄보지': 0,
  //   '토마토': 0,
  //   '일신': 0,
  //   '스쿠알렌': 0,
  //   '요오드': 0,
  //   '갑상선': 0,
  //   '폴리코사놀': 0,
  //   '사탕수수': 0,
  //   '왁스': 0,
  //   '알코올': 0,
  //   '치': 0,
  //   '커리': 0,
  //   '크레아틴': 0,
  //   '근력': 0,
  //   '시': 0,
  //   '글루타민산': 0,
  //   '유래': 0,
  //   '장내': 0,
  //   '강': 0,
  //   '발효': 0,
  //   '다시마': 0,
  //   '알콜': 0,
  //   '손상': 0,
  //   '브로': 0,
  //   '홍국': 0,
  //   '달맞이꽃': 0,
  //   '종자': 0,
  //   '테아닌': 0,
  //   '긴장': 0,
  //   '완화': 0,
  //   '히알루론산': 0,
  //   '카르니틴': 0,
  //   '타르트': 0,
  //   '레이': 0,
  //   '트': 0,
  //   '나': 0,
  //   '솔잎': 0,
  //   '증류': 0,
  //   '귀리': 1,
  //   '깻잎': 1,
  //   '사람': 1,
  //   '구리': 1,
  //   '구아바': 1,
  //   '가려움': 1,
  //   '재채기': 1,
  //   '콧물': 1,
  //   '디메틸': 1,
  //   '설폰': 1,
  //   '폴리': 1,
  //   '덱': 1,
  //   '스트로': 1,
  //   '표고버섯': 1,
  //   '사체': 1,
  //   '헤': 1,
  //   '마토': 1,
  //   '쿠스': 1,
  //   '수치': 2,
  //   '수행': 2,
  //   '능력': 2,
  //   '향상': 2,
  //   '산화': 2,
  //   '인체': 2,
  //   '복합': 2,
  //   '소': 2,
  //   '클로렐라': 2,
  //   '키토산': 2,
  //   '등급': 2,
  //   '상태': 3,
  //   '과민반응': 3,
  //   '제': 3,
  //   '녹차': 3,
  //   '알로에겔': 3,
  //   '열매': 4,
  //   '키토': 4,
  //   '생리': 4,
  //   '호': 4,
  //   '엠에스': 4,
  //   '엠': 4,
  //   '바나바': 4,
  //   '주정': 4,
  //   '회화나무': 4,
  //   '레시틴': 5,
  //   '가수분해': 5,
  //   '갱년기': 6,
  //   '여성': 6,
  //   '스트레스': 6,
  //   '글루코사민': 6,
  //   '베타카로틴': 6,
  //   '난소': 6,
  //   '화성': 6,
  //   '말토': 6,
  //   '덱스트린': 6,
  //   '분말': 6,
  //   '은행': 6,
  //   '농축액': 6,
  //   '프락': 6,
  //   '카르': 6,
  //   '마리': 6,
  //   '아누': 6,
  //   '코엔자임': 7,
  //   '혈압': 8,
  //   '보습': 9,
  //   '틸글루': 9,
  //   '민': 9,
  //   '눌린': 9,
  //   '감마': 10,
  //   '리놀렌산': 10,
  //   '프로폴리스': 10,
  //   '올리고당': 11,
  //   '알': 11,
  //   '에전': 11,
  //   '보충': 12,
  //   '유익': 12,
  //   '조절': 13,
  //   '구강': 14,
  //   '항균': 14,
  //   '신체': 15,
  //   '조직': 15,
  //   '성분': 15,
  //   '효소': 15,
  //   '항체': 15,
  //   '영양성분': 15,
  //   '물질': 15,
  //   '저장': 15,
  //   '체액': 15,
  //   '산': 15,
  //   '염기': 15,
  //   '균형': 15,
  //   '포도당': 15,
  //   '코': 15,
  //   '스': 15,
  //   '항산화작용': 16,
  //   '호르몬': 16,
  //   '팔메': 16,
  //   '전립선': 16,
  //   '등': 17,
  //   '필수': 17,
  //   '공액': 17,
  //   '리놀레산': 17,
  //   '식이섬유': 18,
  //   '오메가': 18,
  //   '장': 19,
  //   '원료': 19,
  //   '활': 20,
  //   '잎': 20,
  //   '지방산': 20,
  //   '과체중': 21,
  //   '밀크': 21,
  //   '슬': 21,
  //   '성인': 22,
  //   '식후': 22,
  //   '상승': 22,
  //   '차': 22,
  //   '전자': 22,
  //   '토': 23,
  //   '비오틴': 23,
  //   '마그네슘': 23,
  //   '피': 23,
  //   '간': 24,
  //   '옥': 25,
  //   '타코': 25,
  //   '놀': 25,
  //   '루테': 25,
  //   '지구력': 26,
  //   '노화': 27,
  //   '황반': 27,
  //   '색소': 27,
  //   '밀도': 27,
  //   '망간': 31,
  //   '셀레늄': 32,
  //   '셀렌': 32,
  //   '중성': 33,
  //   '눈': 33,
  //   '기타': 34,
  //   '혈당': 34,
  //   '연골': 36,
  //   '구성': 36,
  //   '프로바이오틱스': 39,
  //   '관절': 40,
  //   '청년': 48,
  //   '기': 48,
  //   '이전': 48,
  //   '식': 48,
  //   '습관': 48,
  //   '섭취': 48,
  //   '향후': 48,
  //   '지질': 50,
  //   '운동': 52,
  //   '혈중': 52,
  //   '나이아신': 53,
  //   '함유': 54,
  //   '작용': 55,
  //   '혈행': 56,
  //   '판토텐산': 56,
  //   '인삼': 59,
  //   '운반': 59,
  //   '아캄': 59,
  //   '보지': 59,
  //   '것': 69,
  //   '유산균': 76,
  //   '태아': 80,
  //   '경관': 80,
  //   '치아': 85,
  //   '합성': 87,
  //   '증식': 88,
  //   '응고': 90,
  //   '회복': 91,
  //   '체지방': 99,
  //   '엽산': 100,
  //   '균': 103,
  //   '아미노산': 109,
  //   '아연': 110,
  //   '신경': 112,
  //   '콜레스테롤': 113,
  //   '인': 113,
  //   '세포분열': 119,
  //   '어': 124,
  //   '두운': 124,
  //   '곳': 124,
  //   '시각': 124,
  //   '적응': 124,
  //   '위해': 124,
  //   '점막': 124,
  //   '상피세포': 124,
  //   '성장': 124,
  //   '근육': 128,
  //   '물': 140,
  //   '추출': 143,
  //   '피부': 154,
  //   '골다공증': 156,
  //   '발생': 156,
  //   '위험': 156,
  //   '지방': 156,
  //   '건강': 158,
  //   '홍삼': 165,
  //   '결합조직': 168,
  //   '철': 170,
  //   '및': 175,
  //   '원활': 186,
  //   '배변': 187,
  //   '활동': 187,
  //   '혈소판': 188,
  //   '응집': 188,
  //   '통한': 188,
  //   '흐름': 188,
  //   '호모': 190,
  //   '시스테인': 190,
  //   '수준': 190,
  //   '기억': 193,
  //   '줌': 204,
  //   '단백질': 205,
  //   '발달': 206,
  //   '항산화': 207,
  //   '칼슘': 215,
  //   '체내': 234,
  //   '대사': 239,
  //   '뼈': 252,
  //   '탄수화물': 276,
  //   '흡수': 278,
  //   '피로': 281,
  //   '감소': 291,
  //   '이용': 297,
  //   '증진': 308,
  //   '억제': 371,
  //   '로부터': 377,
  //   '보호': 378,
  //   '면역': 403,
  //   '산소': 416,
  //   '생': 428,
  //   '세포': 455,
  //   '제품': 455,
  //   '유해': 463,
  //   '에너지': 513,
  //   '형성': 522,
  //   '기능': 548,
  //   '혈액': 593,
  //   '개선': 593,
  //   '비타민': 633,
  //   '정상': 636,
  //   '유지': 859,
  //   '줄': 1036,
  //   '수': 1116,
  //   '도움': 1378,
  //   '필요': 2968
  // }
};

// checkPk();
// checkBrand();
// checkFN();
// getFN();
// DataToDb();
// sortObjectValue();

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
