import React from 'react';
import { GlobalStyle } from './globalStyles';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Router>
        <GlobalStyle />
        <Routes />
      </Router>
    </>
  );
};

export default App;
