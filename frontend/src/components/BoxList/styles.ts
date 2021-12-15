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

    button {
      width: 0.8rem;
      height: 0.8rem;

      svg {
        width: 100%;
        height: 100%;
        color: var(--dark-color);
        cursor: pointer;
      }
    }
  }

  button {
    background: none;
    border: none;
  }

  border-radius: 0.4rem;
  padding: 0.8rem 1rem;
  background: var(--primary-color-light);
`;

export const List = styled.ul`
  margin-top: 0.8rem;
  list-style: none;

  overflow-y: auto;
  overflow-x: hidden;
  max-height: 270px;

  li + li {
    margin-top: 5px;
  }

  @media (max-width: 1439px) {
    max-height: 170px;
  }

  @media (max-width: 768px) {
    max-height: 140px;
  }

  @media (max-width: 425px) {
    max-height: 130px;
  }

  @media (max-width: 355px) {
    max-height: 110px;
  }

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
`;
