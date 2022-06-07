import styled from '@emotion/styled';

const SortNav = styled.nav`
  flex: 0 1 auto;
  padding: 0 100px;
  ul {
    flex: 0 1 auto;
    display: inline-flex;
    max-width: 550px;
    li {
      flex: 0 1 auto;
      font-size: 14px;
      margin: 0 4px;
      white-space: nowrap;
      color: #838996;
    }
    li::before {
      content: '\\2713';
      font-size: 13px;
      vertical-align: top;
      margin-right: 3px;
    }
  }
  select {
    flex: none;
  }
`;

export { SortNav };
