import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: var(--primary-color);

  width: 100%;
  padding: 12px 40px;

  svg {
    height: 50px;
  }
`;

export const Button = styled.button`
  background: none;
  transition: 0.5s;

  border: 2px solid var(--light-color);
  border-radius: 6px;

  padding: 7px 45px;

  color: var(--light-color);
  font-weight: 500;
  font-size: 1.1em;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  :active {
    background: var(--light-color);
    color: var(--primary-color);
    transition: 0s;
  }
`;
