import React from 'react';
import ReactLoading from 'react-loading';

import { Container } from './styles';

const LoadingPage: React.FC = () => (
  <Container>
    <ReactLoading type="spin" color="var(--dark-color)" />
  </Container>
);

export default LoadingPage;
