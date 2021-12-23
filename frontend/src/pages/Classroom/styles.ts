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

  display: grid;
  grid-gap: 0.5rem;
  grid-template-areas:
    '1fr 1fr'
    'third third';

  div {
    flex: 1;
  }

  div:nth-child(3) {
    grid-area: third;
  }

  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
  }
`;
