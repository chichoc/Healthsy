import styled from '@emotion/styled';

const HeaderProdReview = styled.section`
  margin: 20px 0px;
  h1,
  div {
    margin-bottom: 20px;
  }
  div {
    justify-content: flex-start;
    font-size: 18px;
    h2 {
      margin-right: 5px;
    }
    h2,
    span {
      line-height: 30px;
      margin-right: 5px;
    }
    span:nth-last-of-type(2) {
      margin-right: 1px;
    }
    span.perfect_score {
      color: #b8b8b8;
    }
  }
`;

const DivProdReview = styled.div`
  article {
    border-bottom: 1px solid #e8e8e8;
    padding: 10px 0 10px 5px;
    height: 100px;
  }
  article h2 {
    padding-top: 10px;
  }
  .profile_review {
    margin-right: 10px;
    opacity: 0.4;
  }
  .profile_review img {
    width: 35px;
  }
  .header_review span {
    color: #585858;
    font-size: 13px;
    vertical-align: middle;
    margin-left: 6px;
  }
  .header_review p {
    margin-top: 10px;
    margin-left: 2px;
  }
  .header_review span:first-of-type {
    margin-left: 0px;
  }

  .thumbs_buttons {
    margin: 0 10px 0 30px;
    justify-content: center;
  }
  .thumbs_buttons button {
    border: 1px solid #e8e8e8;
    border-radius: 20px;
    padding: 6px;
    width: 60px;
  }
  button.thumbs_click {
    color: #00c9b7;
    border: 1px solid #00c9b7;
  }
  .thumbs {
    color: #606060;
  }
  .thumbs_click {
    color: #00c9b7;
  }
  .thumbs_buttons button span {
    vertical-align: middle;
    margin-left: 5px;
  }
  .thumbs_buttons button:last-of-type {
    margin-top: 10px;
  }
  h4 img {
    background-color: grey;
    width: 80px;
    height: 80px;
    margin: 10px;
  }
`;

export { HeaderProdReview, DivProdReview };
