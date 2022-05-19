import styled from '@emotion/styled';

const Main = styled.main`
  padding: 0px 100px;
  .observerTarget {
    /* background-color: red; */
    width: 100px;
  }
`;
const Ul = styled.ul`
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  li {
    width: auto;
    margin: 10px 10px;
    text-align: center;
    flex: 1 1 30%;
    cursor: pointer;
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }
`;

const Description = styled.article`
  margin: 0 auto;
  text-align: left;
  .productBrand,
  .productName {
    margin-bottom: 5px;
  }
  .productBrand {
    margin-top: 5px;
    color: grey;
    font-size: 14px;
  }
  .productPrice {
    font-weight: bold;
  }
`;

export { Main, Ul, Description };
