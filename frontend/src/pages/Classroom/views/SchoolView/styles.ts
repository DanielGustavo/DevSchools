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

export const TitleWrapper = styled.span`
  display: flex;
  align-items: flex-end;

  margin-bottom: 40px;

  h1 {
    margin: 0 !important;
  }

  button {
    background: none;
    border: none;
    padding: 0;

    margin-bottom: 0.3rem;
    margin-left: 0.3rem;
    color: var(--gray-color);

    &:hover {
      color: var(--dark-color);
    }
  }

  svg {
    font-size: 0.8rem;
  }
`;
