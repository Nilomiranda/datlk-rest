// @ts-ignore
import { createGlobalStyle } from "styled-components";

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
    height: 100%;
  }
  
  div#root {
    width: 100%;
    height: 100%;
  }
`;
