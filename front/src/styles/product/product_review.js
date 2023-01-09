import styled from '@emotion/styled';

const HeaderProdReview = styled.section`
  button {
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    padding: 10px;
    margin: 30px 0 20px;
  }
  button:hover {
    background-color: #f8f8f8;
  }
  div.avg_score {
    margin: 10px 0 30px;
    justify-content: flex-start;
    align-items: center;
    font-size: 18px;
    h3,
    span {
      margin-right: 5px;
    }
    span:nth-last-of-type(2) {
      margin-right: 3px;
    }
    span.perfect_score {
      color: #b8b8b8;
    }
  }
`;

export { HeaderProdReview };
