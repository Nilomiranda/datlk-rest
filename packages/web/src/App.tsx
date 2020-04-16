import React from 'react';
import {GlobalStyle} from "./globalStyles";
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import theme from "./common/theme";

function App() {
  return (
    <>
      <Router>
        <GlobalStyle />
        <Routes />
      </Router>
    </>
  );
}

export default App;
