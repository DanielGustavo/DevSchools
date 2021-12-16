import styled from 'styled-components';

import { ContainerBreakpoints } from '../../styles';

export const Container = styled.div`
  margin-top: 20px;

  ${ContainerBreakpoints}
`;

export const BoxListsWrapper = styled.div`
  margin-top: 40px;

  display: flex;
  grid-gap: 0.5rem;

  div {
    flex: 1;
  }

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
