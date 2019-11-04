import React from 'react';
import Container from '@material-ui/core/Container';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainRouterWithSuspense from './routers/MainRouterWithSuspense';

const App = (): JSX.Element | React.FunctionComponentElement<{ key: number; }> => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Container maxWidth="sm">
        <MainRouterWithSuspense />
      </Container>
    </BrowserRouter>
  );
};

export default App;
