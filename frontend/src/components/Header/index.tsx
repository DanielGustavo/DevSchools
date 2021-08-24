import React from 'react';

import { ReactComponent as Logo } from '../../assets/images/Logo.svg';

import { Container, Button } from './styles';

const Header: React.FC = () => (
  <Container>
    <Logo />
    <Button>Sign in</Button>
  </Container>
);

export default Header;
