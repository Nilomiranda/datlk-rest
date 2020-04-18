// @ts-ignore
import { createGlobalStyle } from 'styled-components';
import theme from './common/theme';
// @ts-ignore
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  
  html, body {
    width: 100%;
    min-height: 100vh;
    background: ${theme.colors.lightGreen};
  }
  
  div#root {
    width: 100%;
    height: 100vh;
  }
`;
