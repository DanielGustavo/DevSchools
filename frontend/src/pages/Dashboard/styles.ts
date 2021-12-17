import styled from 'styled-components';

import { ContainerBreakpoints } from '../../styles';

export const Container = styled.section`
  margin-top: 20px;
  margin-bottom: 20px;

  h1 {
    margin-bottom: 40px;
  }

  ${ContainerBreakpoints}
`;

export const BoxListsWrapper = styled.div`
  margin-bottom: 0.5rem;

  display: flex;
  grid-gap: 0.5rem;

  div {
    flex: 1;
  }

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
