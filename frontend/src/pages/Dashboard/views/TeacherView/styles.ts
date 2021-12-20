import styled from 'styled-components';

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
