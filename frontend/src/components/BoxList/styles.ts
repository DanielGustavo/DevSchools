import styled from 'styled-components';

export const Container = styled.div`
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-weight: 600;
      text-transform: capitalize;
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
