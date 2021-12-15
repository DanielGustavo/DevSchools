import styled from 'styled-components';

export const Container = styled.li`
  background: var(--primary-color);
  color: var(--dark-color);
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 0.8rem;
  font-weight: 400;

  div {
    display: flex;
    align-items: center;
  }

  button {
    width: 0.8rem;
    height: 0.8rem;

    svg {
      color: var(--danger-color);
      width: 100%;
      height: 100%;
    }
  }

  border-radius: 0.4rem;
  padding: 0.3rem 0.3rem;

  @media (max-width: 767px) and (min-width: 425px) {
    padding: 0.5rem 0.5rem;
  }

  @media (max-width: 425px) {
    padding: 0.4rem 0.4rem;
  }
`;

export const IconWrapper = styled.div`
  margin-right: 0.5rem;

  background: var(--dark-color);
  color: var(--light-color);

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
