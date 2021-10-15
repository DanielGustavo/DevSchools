import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';

import { AuthProvider } from './contexts/Auth.context';

import Routes from './routes';

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
