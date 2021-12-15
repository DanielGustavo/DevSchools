import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 40px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-weight: 600;
    }

    svg {
      font-size: 0.8rem;
      color: var(--dark-color);
      cursor: pointer;
    }
  }

  button {
    background: none;
    border: none;
  }

  border-radius: 0.4rem;
  padding: 1rem 1.2rem;
  background: var(--primary-color-light);
`;

export const List = styled.ul`
  margin-top: 1rem;
  list-style: none;

  overflow-y: auto;
  overflow-x: hidden;
  max-height: 290px;

  li + li {
    margin-top: 5px;
  }

  @media (max-width: 1439px) {
    max-height: 200px;
  }

  @media (max-width: 425px) {
    max-height: 135px;
  }

  @media (min-width: 768px) {
    /* ===== Scrollbar CSS ===== */
    /* Firefox */
     {
      scrollbar-width: auto;
      scrollbar-color: var(--primary-color);
    }

    /* Chrome, Edge, and Safari */
    ::-webkit-scrollbar {
      width: 0.3rem;
    }

    ::-webkit-scrollbar-track {
      background: var(--primary-color-dark);
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--dark-color);
      border-radius: 10px;
    }
  }
`;
