import styled from '@emotion/styled';

const UlProdReview = styled.ul`
  margin: 10px 0px;
  text-align: center;
  justify-content: center;
  li {
    width: 40px;
  }
  button {
    font-size: 18px;
    padding: 10px;
    margin: 0 5px;
    width: 30px;
    display: flex;
    align-items: : center;
    justify-content: center;
  }
  button.prev_arrow,
  button.next_arrow {
    color: #b8b8b8;
    padding: 10px;
    margin: 0 5px;
    width: 30px;
  }
  button.selectedBtn {
    background-color: #f0f0f0;
    width: 30px;
    border-radius: 30px;
  }
  button:hover {
    background-color: #f8f8f8;
    width: 30px;
    border-radius: 30px;
  }
`;

export { UlProdReview };
