import styled, { css } from 'styled-components';

import { ButtonProps } from '.';

export const Container = styled.button<ButtonProps>`
  transition: 0.5s;
  padding: 0.7rem 2.5rem;
  border-radius: 4px;
  font-size: 1rem;
  text-transform: capitalize;
  color: var(--light-color);

  ${({ outlined = false }) =>
    outlined ? OutlinedContainerStyle : FilledContainerStyle}
`;

export const FilledContainerStyle = css`
  background: var(--secondary-color);
  border: 2px solid transparent;
  font-weight: 600;

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

export const OutlinedContainerStyle = css`
  background: none;
  border: 2px solid var(--light-color);
  font-weight: 500;

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
