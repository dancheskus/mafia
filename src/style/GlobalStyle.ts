import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    font-family: 'Exo 2', sans-serif;
    user-select: none;
  }

  button {
    padding: 0;
    background: none;
    border: none;
    :focus {
      outline: none;
    }
  }
`;
