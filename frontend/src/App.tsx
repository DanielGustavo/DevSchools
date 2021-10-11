import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';

import Routes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <Routes />
  </BrowserRouter>
);

export default App;
