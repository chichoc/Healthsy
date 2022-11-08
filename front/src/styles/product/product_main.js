import styled from '@emotion/styled';

const MainProduct = styled.main`
  margin: 30px 100px;
  justify-content: center;
  img {
    max-width: 50%;
    height: 400px;
  }
  div.product_primary {
    width: 45%;
    margin-left: 5%;
    justify-content: flex-start;
  }
  div.product_primary div.product_header {
    align-content: center;
    flex-wrap: nowrap;
    margin-bottom: 10px;
    line-height: 30px;
    h1 {
      font-size: 25px;
    }
    button {
      margin-left: 20px;
    }
  }
  div.product_primary h2.product_brand {
    font-size: 16px;
    margin-bottom: 12px;
    color: #404040;
  }
  div.product_primary h3 {
    margin-bottom: 20px;
    font-size: 23px;
  }
  div.product_primary h4.product_score {
    margin-bottom: 10px;
  }
`;

const DivProductBtns = styled.div`
  button {
    margin: 10px 0;
    padding: 0;
    align-items: center;
  }
  span {
    font-size: 15px;
    margin-left: 5px;
  }
`;

export { MainProduct, DivProductBtns };
