import React from 'react';

import AvatarMenu from './partials/AvatarMenu';

import useAuth from '../../hooks/useAuth';

import { Container, ButtonLink, Logo } from './styles';

const Header: React.FC = () => {
  const { authenticated } = useAuth();

  return (
    <Container authenticated={authenticated}>
      <Logo to="/" />

      {authenticated ? (
        <AvatarMenu />
      ) : (
        <ButtonLink light outlined to="/signin">
          Sign in
        </ButtonLink>
      )}
    </Container>
  );
};

export default Header;
