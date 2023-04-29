import styled from '@emotion/styled';

const ArticleModal = styled.article`
  background: white;
  padding: 20px 0px 20px 40px; // 스크롤 사이 여백 없애고자 오른쪽 padding만 값 안 줌
  width: 100%;
  max-width: 350px;
  height: 600px;
  border-radius: 30px;

  header {
    height: 40px;
    padding: 10px 0;
  }
  header h1 {
    font-size: 23px;
    font-weight: bold;
    line-height: 38px;
  }
  header button {
    color: #ababab;
    font-size: 25px;
    padding-right: 30px;
  }
  & > div {
    max-height: 530px;
    overflow-y: auto;
    padding-right: 40px;
  }
`;

export { ArticleModal };
