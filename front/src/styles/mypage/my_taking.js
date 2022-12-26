import styled from '@emotion/styled';

const SectionTaking = styled.section`
  p.guide {
    font-size: 15px;
    color: #383838;
    span {
      letter-spacing: 1px;
      color: #989898;
    }
  }
  h2 {
    font-weight: bold;
    font-size: 20px;
    margin: 30px 0;
  }
  & > ul:first-of-type {
    max-height: 220px;
  }
  & > ul:first-of-type li {
    flex: 0 0 15%;
  }

  ul li.table h4 {
    position: sticky;
    left: 0;
    z-index: 1;
  }
  ul li.table ul {
    overflow-x: visible;
  }
  ul li.table ul li {
    flex: 0 0 160px;
    box-sizing: border-box;
  }
  ul li.table h4 span {
    color: #888888;
  }
  ul li.table p {
    box-sizing: border-box;
    flex: 0 0 160px;
  }
  ul li.table p span:last-of-type {
    color: #00c9b7;
  }
  ul li.table p:empty:before {
    content: '해당 없음';
    color: #c8c8c8;
  }
`;

export { SectionTaking };
