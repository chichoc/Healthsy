const dataJoinTerms = [
  {
    header: '아래 내용에 모두 동의합니다.',
    id: 'checkAll',
    button: false,
  },
  {
    header: '만 14세 이상입니다.',
    id: 'checkAge',
    detail: '(필수)',
    detailClassName: 'required',
    button: false,
  },
  {
    header: '서비스 이용약관 동의',
    id: 'checkService',
    detail: '(필수)',
    detailClassName: 'required',
    button: true,
  },
  {
    header: '개인정보 처리방침 동의',
    id: 'checkInfo',
    detail: '(필수)',
    detailClassName: 'required',
    button: true,
  },
  {
    header: '마케팅 정보 수신 및 활용 동의',
    id: 'checkMarketing',
    detail: '(선택)',
    detailClassName: 'optional',
    button: true,
  },
];

export default dataJoinTerms;
