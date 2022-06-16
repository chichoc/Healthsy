import styled from '@emotion/styled';

const MainReviewForm = styled.main`
  section {
    margin: 10px 0;
    textarea {
      font-size: 15px;
      height: 100px;
      border: 1px solid #96b1ac;
    }
  }
  div,
  p {
    text-align: center;
  }
  button {
    width: 160px;
    font-size: 18px;
    margin-top: 10px;
  }
  .score_icon {
    color: #e8f3f1;
  }
  .score_icon:hover ~ .score_icon,
  .score_icon:hover {
    color: #9eec8a;
  }
`;

export { MainReviewForm };
