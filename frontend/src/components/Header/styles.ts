import styled from 'styled-components';

import {
  OutlinedButton as GlobalOutlinedButton,
  ContainerBreakpoints,
} from '../../styles';

export const OutlinedButton = styled(GlobalOutlinedButton)`
  font-size: 0.8rem;
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
