import styled from '@emotion/styled';

const MainReviewForm = styled.main`
  flex-wrap: nowrap;
  section {
    margin: 10px 0;
    textarea {
      font-size: 15px;
      height: 150px;
      border: 1px solid #e8f3f1;
      background-color: #e8f3f1;
      border-radius: 10px;
    }
    textarea::placeholder {
      font-size: 15px;
    }
    // 소제목
    h2 {
      margin-bottom: 5px;
      font-size: 18px;
    }
    // 별점
    .star_scores {
      justify-content: center;
    }
    .star_scores .score_icon {
      color: #e8f3f1;
    }
    .star_scores:hover .score_icon,
    .score_icon.score_select {
      color: #f9d66c;
    }
    .star_scores .score_icon:hover ~ .score_icon {
      color: #e8f3f1;
    }
    p,
    h4 {
      text-align: center;
      font-size: 20px;
      margin-top: 5px;
    }
    span {
      color: #b8b8b8;
    }
    p.score_comment {
      font-size: 15px;
      color: #585858;
      margin-top: 5px;
    }
  }

  button {
    width: 160px;
    font-size: 18px;
    margin-top: 10px;
  }
`;

export { MainReviewForm };
