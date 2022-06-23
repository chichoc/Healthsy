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
  h2 {
    margin-bottom: 10px;
  }
  h2 span {
    color: #585858;
    font-size: 13px;
    vertical-align: middle;
    margin-left: 6px;
  }
  h2 span:first-of-type {
    margin-left: 0px;
  }
  h4 {
    margin: 10px 0;
  }
`;

export { HeaderProdReview, DivProdReview };
