import styled from '@emotion/styled';

const UlBoard = styled.ul`
  li {
    border-bottom: 1px solid #e8e8e8;
    padding: 20px 0px;
    max-height: 30%;
    justify-content: space-between;
    flex-wrap: nowrap;
    span {
      flex: 1 0 auto;
    }
    span.id {
      margin-right: 5%;
      color: #00c9b7;
    }
    span.date {
      margin-right: 3%;
      color: #ababab;
      font-size: 13px;
    }
    h2 {
      flex: 1 1 75%;
      margin-right: 3%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
    }
  }
`;

export { UlBoard };
