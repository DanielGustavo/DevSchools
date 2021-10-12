import styled from 'styled-components';
import { Link } from 'react-router-dom';

import LogoImage from '../../assets/images/Logo.svg';

import {
  OutlinedButton as GlobalOutlinedButton,
  ContainerBreakpoints,
} from '../../styles';

export const Logo = styled(Link)`
  margin: 0;
  padding: 0;
  background-image: url(${LogoImage});
  width: 131px;
  height: 50px;
`;

export const OutlinedButton = styled(GlobalOutlinedButton)`
  font-size: 0.8rem;
  padding: 0.25rem 1.7rem;
`;

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: var(--primary-color);

  width: 100%;
  padding: 12px;

  @media (max-width: 425px) {
    justify-content: center;

    ${OutlinedButton} {
      display: none;
    }
  }

  ${ContainerBreakpoints}
`;
