// 1일 영양성분 기준치 (제6조제2항 및 제3항 관련) 개정 2022.11.28
const dataTaking = [
  { header: '비타민A', unit: 'ug', standard: 700 }, //ugRE, ug RAE = mcg
  { header: '비타민D', unit: 'ug', standard: 10 },
  { header: '비타민E', unit: 'mga-TE', standard: 11 }, //mga-TE, mg a-TE
  { header: '비타민K', unit: 'ug', standard: 70 },
  { header: '비타민C', unit: 'mg', standard: 100 },
  { header: '비타민B1', unit: 'mg', standard: 1.2 },
  { header: '비타민B2', unit: 'mg', standard: 1.4 },
  { header: '나이아신', unit: 'mgNE', standard: 15 },
  { header: '비타민B6', unit: 'mg', standard: 1.5 },
  { header: '엽산', unit: 'ug', standard: 400 }, // ㎍ DFE
  { header: '비타민B12', unit: 'ug', standard: 2.4 },
  { header: '판토텐산', unit: 'mg', standard: 5 },

  { header: '탄수화물', unit: 'g', standard: 324 },
  { header: '당류', unit: 'g', standard: 100 },
  { header: '식이섬유', unit: 'g', standard: 25 },
  { header: '단백질', unit: 'g', standard: 55 },
  { header: '지방', unit: 'g', standard: 54 },
  // { header: '리놀레산', unit: 'g', standard: 10 },
  // { header: '알파-리놀렌산', unit: 'g', standard: 1.3 },
  { header: 'EPA와 DHA의 합', unit: 'mg', standard: 330 },
  { header: '포화지방', unit: 'g', standard: 15 },
  { header: '콜레스테롤', unit: 'mg', standard: 300 },
  { header: '나트륨', unit: 'mg', standard: 2000 },
  { header: '칼륨', unit: 'mg', standard: 3500 },
  { header: '칼슘', unit: 'mg', standard: 700 },
  { header: '마그네슘', unit: 'mg', standard: 315 },
  { header: '크롬', unit: 'ug', standard: 30 },
  { header: '몰리브덴', unit: 'ug', standard: 25 },

  { header: '인', unit: 'mg', standard: 700 },
  { header: '바이오틴', unit: 'ug', standard: 30 },
  { header: '요오드', unit: 'ug', standard: 150 },
  { header: '아연', unit: 'mg', standard: 8.5 },
  { header: '철분', unit: 'mg', standard: 12 },
  { header: '셀레늄', unit: 'ug', standard: 55 },
  { header: '구리', unit: 'mg', standard: 0.8 },
  { header: '망간', unit: 'mg', standard: 3.0 },
];

export default dataTaking;
