import React, { useEffect, useState } from 'react';

import useAuth from '../../../../hooks/useAuth';

import {
  Container,
  IconWrapper,
  MenuBox,
  ArrowDownIcon,
  HamburguerIcon,
  MainWrapper,
} from './styles';

const AvatarMenu: React.FC = () => {
  const [showMenuBox, setShowMenuBox] = useState(false);

  const { user, logout } = useAuth();

  function openMenuBox() {
    setShowMenuBox(!showMenuBox);
  }

  useEffect(() => {
    function hideMenuBox() {
      setShowMenuBox(false);
    }

    if (showMenuBox) {
      document.addEventListener('click', hideMenuBox);
    }

    return () => {
      if (showMenuBox) {
        document.removeEventListener('click', hideMenuBox);
      }
    };
  }, [setShowMenuBox, showMenuBox]);

  if (!user) {
    return <></>;
  }

  return (
    <Container>
      <button type="button" onClick={openMenuBox}>
        <HamburguerIcon />
      </button>

      <MainWrapper>
        <IconWrapper>
          {user.avatarFilename ? (
            <img src={user.avatarFilename} alt={user.name} />
          ) : (
            user.name.slice(0, 2).toUpperCase()
          )}
        </IconWrapper>

        <div>
          <strong>{user.name}</strong>
          <small>{user.email}</small>
        </div>

        <button type="button" onClick={openMenuBox}>
          <ArrowDownIcon selected={showMenuBox} />
        </button>
      </MainWrapper>

      {showMenuBox && (
        <MenuBox>
          <li>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </li>
        </MenuBox>
      )}
    </Container>
  );
};

export default AvatarMenu;
