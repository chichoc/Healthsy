import styled from '@emotion/styled';

const HeaderProdReview = styled.section`
  margin: 20px 0px;
  h1,
  div {
    margin-bottom: 20px;
  }
  div {
    justify-content: flex-start;
    font-size: 18px;
    h2 {
      margin-right: 5px;
    }
    h2,
    span {
      line-height: 30px;
      margin-right: 5px;
    }
    span:nth-last-of-type(2) {
      margin-right: 1px;
    }
    span.perfect_score {
      color: #b8b8b8;
    }
  }
`;

const DivProdReview = styled.div`
  article {
    border-bottom: 1px solid #e8e8e8;
    padding: 10px 0 10px 5px;
  }
  article h2 {
    margin-bottom: 10px;
  }
  article h2 span {
    color: #585858;
    font-size: 13px;
    vertical-align: middle;
    margin-left: 6px;
  }
  article h2 span:first-of-type {
    margin-left: 0px;
  }
  h4 {
    margin: 10px 0;
  }
  h4 div {
    margin: auto 0;
  }
  h4 div button {
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 5px;
  }
  h4 img {
    background-color: grey;
    width: 80px;
    height: 80px;
    margin: 0 10px;
  }
`;

export { HeaderProdReview, DivProdReview };
