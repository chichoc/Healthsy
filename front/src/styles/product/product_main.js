import styled from '@emotion/styled';

const MainProduct = styled.main`
  margin: 0px 100px 30px;
  justify-content: center;
  img {
    width: auto;
    height: 280px;
  }
  div {
    width: 300px;
    padding-left: 10px;
    margin-left: 30px;
    justify-content: flex-start;
  }
  div h2,
  div h3 {
    margin-bottom: 20px;
    font-size: 25px;
  }

  div h3.product_brand {
    font-size: 16px;
  }
`;

export { MainProduct };
