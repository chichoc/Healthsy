import styled from '@emotion/styled';

const HeaderProdReview = styled.section`
  button {
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    padding: 10px;
    margin: 30px 0 20px;
  }
  button:hover {
    background-color: #f8f8f8;
  }
  div.avg_score {
    margin: 10px 0 30px;
    justify-content: flex-start;
    align-items: center;
    font-size: 18px;
    h3,
    span {
      margin-right: 5px;
    }
    span:nth-last-of-type(2) {
      margin-right: 3px;
    }
    span.perfect_score {
      color: #b8b8b8;
    }
  }
`;

const DivProdReview = styled.div`
  article {
    border-bottom: 1px solid #e8e8e8;
    padding: 10px 0px;
    max-height: 40%;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
  article figure.profile_review {
    padding-top: 10px;
    margin-right: 10px;
    width: 10%;
    max-width: 100px;
    text-align: center;
    img {
      width: 50px;
      opacity: 0.4;
    }
    span {
      font-size: 15px;
      color: #585858;
      display: inline-block;
    }
    a {
      font-size: 3px;
      color: #c0c0c0;
    }
  }
  article div {
    flex: 1 1 75%;
    div.info_review {
      justify-content: flex-start;
      margin-right: 0px;
      flex: 1 1 auto;
      span {
        color: #b8b8b8;
        font-size: 13px;
        vertical-align: text-bottom;
        margin-left: 10px;
        line-height: 20px;
      }
      span:first-of-type {
        margin-left: 0px;
      }
    }
    div.content_review {
      justify-content: space-between;
      flex-wrap: nowrap;
      flex: 1 1 auto;
      p {
        margin-top: 10px;
        margin-left: 5px;
        overflow-wrap: break-word;
        letter-spacing: 1px;
        line-height: 1.3;
        font-size: 13px;
        flex: 1 2 auto;
      }
      div.photo_review {
        flex: 0 1 25%;
        margin-left: 2%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  article aside.thumbs_buttons {
    margin-left: 3%;
    justify-content: center;
    button {
      border: 1px solid #e8e8e8;
      border-radius: 20px;
      padding: 6px;
      width: 60px;
      .thumbs {
        color: #606060;
      }
      span {
        vertical-align: middle;
        margin-left: 5px;
      }
    }
    button.thumbs_click {
      border: 1px solid #00c9b7;
    }
    .thumbs_click {
      color: #00c9b7;
    }
    button:first-of-type {
      margin-bottom: 5px;
    }
    button:last-of-type {
      margin-top: 5px;
    }
  }
`;

export { HeaderProdReview, DivProdReview };
