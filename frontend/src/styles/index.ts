import styled, { css } from 'styled-components';

export const Button = styled.button`
  background: var(--secondary-color);
  transition: 0.5s;

  border: 2px solid transparent;
  border-radius: 6px;

  padding: 0.7rem 2.5rem;

  color: var(--light-color);
  font-weight: 600;
  font-size: 1rem;
  text-transform: capitalize;

  :hover {
    background-color: var(--secondary-color-dark);
  }

  :active {
    background: none;
    border: 2px solid var(--secondary-color);
    color: var(--secondary-color);
    transition: 0s;
  }

  @media (max-width: 425px) {
    font-size: 1.2rem;
  }
`;

export const OutlinedButton = styled.button`
  background: none;
  transition: 0.5s;

  border: 2px solid var(--light-color);
  border-radius: 6px;

  padding: 0.25rem 1.7rem;

  color: var(--light-color);
  font-weight: 500;
  font-size: 1rem;
  text-transform: capitalize;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  :active {
    background: var(--light-color);
    color: var(--primary-color);
    transition: 0s;
  }

  @media (max-width: 425px) {
    font-size: 1rem;
  }
`;

export const ContainerBreakpoints = css`
  @media (max-width: 768px) {
    padding-right: 3% !important;
    padding-left: 3% !important;
  }

  @media (min-width: 768px) {
    padding-right: 5% !important;
    padding-left: 5% !important;
  }

  @media (min-width: 1860px) {
    padding-right: 20% !important;
    padding-left: 20% !important;
  }

  @media (min-width: 2240px) {
    padding-right: 25% !important;
    padding-left: 25% !important;
  }
`;
