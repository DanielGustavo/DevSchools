import React from 'react';
import { useHistory } from 'react-router-dom';

import AvatarMenu from './partials/AvatarMenu';

import useAuth from '../../hooks/useAuth';

import { Container, Button, Logo } from './styles';

const Header: React.FC = () => {
  const { authenticated } = useAuth();
  const { push } = useHistory();

  return (
    <Container authenticated={authenticated}>
      <Logo to="/" />

      {authenticated ? (
        <AvatarMenu />
      ) : (
        <Button light outlined onClick={() => push('/signin')}>
          Sign in
        </Button>
      )}
    </Container>
  );
};

export default Header;
