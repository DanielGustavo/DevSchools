import React from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Button, Logo } from './styles';

const Header: React.FC = () => {
  const { push } = useHistory();

  return (
    <Container>
      <Logo to="/" />

      <Button light outlined onClick={() => push('/signin')}>
        Sign in
      </Button>
    </Container>
  );
};

export default Header;
