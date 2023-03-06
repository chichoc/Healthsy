import styled from '@emotion/styled';

const Content = styled.main`
  overflow-y: auto;
  text-align: center;
  flex: 1 1 auto;
  

  div.dots {
    position: fixed;
    height: height: calc(100vh - 140px);
    background-color: yellow;
  }

  div.dots div {
    width: 10;
    height: 10;
    border: 1px solid black;
    border-radius: 999;
  }

  main.outer::-webkit-scrollbar {
    display: none;
  }

  main.outer {
    height: 100vh;
    overflow-y: auto;
    padding: 0 100px;
  }
  div.inner {
    height: calc(100vh - 130px);
    flex-wrap: nowrap;
  }
  div.inner img {
    margin: 50px 5% 50px 0px;
    max-width: 60%;
    object-fit: contain;
    border-radius: 20px;
    box-shadow: -10px 10px 20px 1px rgba(0, 0, 0, 0.1);
    padding: 10px;
  }

  div.text {
    text-align: left;
    justify-content: center;
    max-width: 35%;
    letter-spacing: 1px;
  }
  div.text h4 {
    font-size: 28px;
    font-weight: 500;
    margin-bottom: 30px;
  }
  div.text p {
    font-size: 17px;
    line-height: 1.4;
  }
  div.text span {
    font-size: 14px;
    line-height: 1.2;
    color: #909090;
    letter-spacing: 0.3px;
    margin-top: 10px;
  }
  div.text P span {
   vertical-align: top;
  }

  div.inner:nth-of-type(even){
    flex-direction: row-reverse;
    
    img {
      box-shadow: 10px 10px 20px 1px rgba(0, 0, 0, 0.1);
      margin: 50px 0px 50px 5%;
    }
    div.text {
      text-align: right;
  }
  }

  button {
    font-size: 18px;
    margin-top: 30px;
    padding: 10px;
    color: #ffff;
    background-color: #00c9b7;
  }
`;

export { Content };
