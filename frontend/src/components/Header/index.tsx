import React from 'react';

import { ReactComponent as Logo } from '../../assets/images/Logo.svg';

import { Container, OutlinedButton } from './styles';

const Header: React.FC = () => (
  <Container>
    <Logo />
    <OutlinedButton>Sign in</OutlinedButton>
  </Container>
);

export default Header;
