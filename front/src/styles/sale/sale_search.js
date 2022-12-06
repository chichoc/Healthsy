import styled from '@emotion/styled';

const DivSaleSearch = styled.div`
  margin: 68px auto 0; // 30 + 50 - 10
  max-width: 70%;
  position: relative;
  &.sale {
    margin: 30px auto; // 30 + 50 - 10
    max-width: 60%;
  }
  section {
    max-width: 100%;
    overflow-y: hidden;
    background-color: white;
    border-radius: 0 0 20px 20px;
    border: 0.5px solid #ababab;
    max-width: 100%;
    padding: 10px 0px 10px 45px;
    box-sizing: border-box;
  }
  &.sale section {
    position: absolute;
    width: 100%;
    top: 60px; // 40 + 20
    border: 0.5px solid #ababab;
  }
  section header {
    padding-right: 45px;
  }
  section h3,
  section header button {
    color: #616161;
    font-size: 15px;
    padding: 10px 0px;
  }
  section h3 {
    padding: 10px 10px;
  }
  section ul {
    max-height: 550px;
    overflow-y: auto;
    padding-right: 45px;
  }
  &.sale section ul {
    max-height: 460px;
  }

  section ul li {
    cursor: pointer;
    letter-spacing: 1px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 0px;
  }
  section ul li.search_sales {
    justify-content: flex-start;
    padding: 10px;
  }

  section li div.search_history {
    flex-grow: 1;
    padding: 10px;
  }
  section li.search_sales:hover,
  section li div.search_history:hover {
    background-color: #f0f0f0;
    border-radius: 10px;
  }

  section li.search_sales img {
    width: 50px;
  }
  section li div.search_sales {
    padding: 5px 10px;
  }
  section li div.search_sales span:first-of-type {
    color: #787878;
    font-size: 14px;
  }
  section li div.search_history span:last-of-type {
    padding-left: 10px;
    color: #a8a8a8;
  }

  section li button {
    padding-right: 0px;
    color: #787878;
    width: 56px;
    flex-grow: 0;
  }
  section header button:hover,
  section li button:hover {
    color: #ff3300;
  }
  section p {
    padding: 20px 10px;
    color: #616161;
  }
`;

export { DivSaleSearch };
