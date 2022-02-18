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

          label:hover {
            cursor: pointer;
          }

          .horizontal_flex {
            display: flex;
            justify-content: space-between;
            /* align-items: props.align; */
            flex-wrap: wrap;
          }

          .vertical_flex {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            /* align-items: props.align; */
            flex-wrap: wrap;
          }
          @import url('https://fonts.googleapis.com/css2?family=Rokkitt:wght@600&display=swap');

          .logo {
            font-size: 40px;
            font-family: 'Rokkitt', serif;
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
