import React from 'react';
import { Global, css } from '@emotion/react';
import emotionReset from 'emotion-reset';

const global = () => {
  return (
    <>
      <Global
        styles={css`
          ${emotionReset}

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
              'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          }

          * {
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
          }
          a {
            text-decoration: none;
            color: inherit;
          }
          button {
            border: none;
            background-color: transparent;
          }

          input:focus {
            outline: none;
          }

          label:hover,
          button:hover {
            cursor: pointer;
          }

          .horizontal_flex {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            /* align-items: props.align; */
          }

          .vertical_flex {
            display: flex;
            flex-flow: column wrap;
            justify-content: space-between;
            /* align-items: props.align; */
          }

          html,
          body {
            height: 100%;
          }
          body {
            display: flex;
            flex-direction: column;
          }
        `}
      />
    </>
  );
};

export default global;
