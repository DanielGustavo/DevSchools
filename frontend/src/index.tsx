import ReactDOM from 'react-dom';

import Header from './components/Header';
import App from './App';

import GlobalStyle from './styles/global';

ReactDOM.render(
  <>
    <GlobalStyle />
    <Header />
    <App />
  </>,
  document.getElementById('root')
);
