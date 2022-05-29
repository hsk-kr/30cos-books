import { createGlobalStyle } from 'styled-components';

const reset = `
  body {
    margin: 0;
  }

  button {
    border: 0;
    outline: none;
  }

  input {
    all: unset;
  }
`;

export default createGlobalStyle`
  ${reset}

  body {
    color: ${({ theme }) => theme.colors.text.default};
  }

  button, h1, h2, h3, h4, h5, h6, 
  p, span, label, div, input {
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
  }
`;
