import styled from '@emotion/styled';

const DivReviewSort = styled.div`
  border-bottom: 0.1px solid #989898;
  div {
    width: 100px;
    justify-content: center;
  }
  button {
    font-size: 15px;
    padding: 0 10px;
    color: #838996;
  }
  button:first-of-type {
    padding-left: 0;
  }
  button:last-of-type {
    border-left: solid 0.2px #989898;
    margin: 10px 0;
  }
  button.selected {
    color: #000000;
    font-weight: bold;
  }
`;

export { DivReviewSort };
