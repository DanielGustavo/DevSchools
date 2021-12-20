import styled from 'styled-components';

export const BoxListsWrapper = styled.div`
  margin-bottom: 0.5rem;

  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 1fr 1fr;

  div {
    flex: 1;
  }

  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
  }
`;
