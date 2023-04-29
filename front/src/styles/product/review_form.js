import styled from '@emotion/styled';

const DivReviewForm = styled.div`
  flex-wrap: nowrap;
  section {
    margin: 15px 0;
    textarea {
      font-size: 15px;
      height: 100px;
      border: 1px solid #f0f0f0;
      border-radius: 10px;
      padding: 10px;
    }
    textarea::placeholder {
      font-size: 15px;
      color: #888888;
    }
    // 소제목
    h2 {
      margin-bottom: 15px;
      font-size: 17px;
    }
    // 별점
    .star_scores {
      justify-content: center;
      padding: 10px 0;
    }
    .star_scores .score_icon {
      color: #f0f0f0;
      margin-right: 5px;
    }
    .star_scores:hover .score_icon,
    .score_icon.score_select {
      color: #f9d66c;
    }
    .star_scores .score_icon:hover ~ .score_icon {
      color: #f0f0f0;
    }
    p,
    h4 {
      text-align: center;
      margin-top: 5px;
      color: #b8b8b8;
    }
    h4 {
      font-size: 17px;
    }
    p {
      font-size: 15px;
    }
    h4 span {
      color: black;
    }
  }
  section.photo {
    overflow-x: auto;
    margin-top: 0px;
    justify-content: flex-start;
    flex-wrap: nowrap;
    padding: 10px 0;

    label[for='reviewPhoto'] {
      color: #888888;
      background-color: #f8f8f8;
      border-radius: 10px;
      min-width: 80px;
      height: 80px;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
    }
    p > span {
      font-weight: bold;
    }
    span.over {
      color: #cc2900;
    }
    input {
      display: none;
    }
    div.outer {
      display: inline-block;
      position: relative;
      text-align: center;
      margin-right: 10px;
      border: 1px solid #f0f0f0;
      min-width: 80px;
      max-height: 80px;
    }
    div.inner {
      border-radius: 10px;
      overflow: hidden;
    }
    img {
      max-width: 80px;
      max-height: 80px;
    }
    button.remove {
      position: absolute;
      right: -14px;
      top: -8px;
    }
    button.remove svg {
      border-radius: 11px;
      background-color: white;
    }
    button.remove svg:hover {
      fill: #cc2900;
    }
  }

  div > button:not(.remove) {
    width: 160px;
    font-size: 18px;
    margin-top: 10px;
  }
  div > button:not(.remove):first-of-type {
    border-color: #ababab;
    color: #ababab;
    margin-right: 10px;
  }
`;

export { DivReviewForm };
