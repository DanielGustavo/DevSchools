import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header';

import { AuthProvider } from './contexts/Auth.context';

import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>

    <ToastContainer />
  </AuthProvider>
);

export default App;
