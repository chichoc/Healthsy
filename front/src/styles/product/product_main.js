import styled from '@emotion/styled';

const MainProduct = styled.main`
  margin: 30px 100px;
  justify-content: center;
  img {
    max-width: 40%;
    aspect-ratio: auto 1 / 1;
  }
  div.product_primary {
    width: 45%;
    margin-left: 5%;
    justify-content: space-between;
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

  button.svg_btns {
    align-items: center;
    opacity: 1;
  }
  div.key_btns button {
    margin: 10px 0;
  }
  button.svg_btns span {
    font-size: 15px;
    margin-left: 5px;
  }
  button.svg_btns:hover {
    opacity: 0.7;
  }
  button.svg_btns:hover svg {
    fill: #00c9b7;
  }
`;

export { MainProduct };
