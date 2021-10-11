import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container, OutlinedButton, Logo } from './styles';

const Header: React.FC = () => {
  const { push } = useHistory();

  return (
    <Container>
      <Logo to="/" />

      <OutlinedButton onClick={() => push('/signin')}>Sign in</OutlinedButton>
    </Container>
  );
};

export default Header;
