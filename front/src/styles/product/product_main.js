import styled from '@emotion/styled';

const MainProduct = styled.main`
  margin: 0px 100px 30px;
  justify-content: center;
  img {
    width: auto;
    height: 280px;
  }
  div.product_primary {
    width: 300px;
    padding-left: 10px;
    margin-left: 30px;
    justify-content: flex-start;
  }
  div h2,
  div h3 {
    margin-bottom: 10px;
    font-size: 25px;
  }
  div h3.product_brand {
    font-size: 16px;
    margin-bottom: 12px;
    color: #404040;
  }
  div h4.product_score {
    margin-bottom: 10px;
  }
  div h4.product_info {
    margin-top: 10px;
  }
  div h4.product_info div {
    justify-content: flex-start;
    flex-wrap: nowrap;
    margin-bottom: 5px;
    p {
      width: 250px;
      margin-left: 10px;
      white-space: normal;
    }
  }
`;

const BtnProduct = styled.div`
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

export { MainProduct, BtnProduct };
