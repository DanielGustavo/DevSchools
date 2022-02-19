import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Props } from '.';

export const Container = styled(Link)<Props>`
  transition: 0.5s;
  padding: 0.7rem 2.5rem;
  border-radius: 4px;
  font-size: 1rem;
  text-transform: capitalize;
  color: var(--light-color);

  text-align: center;

  ${({ disabled }) =>
    !!disabled &&
    css`
      opacity: 0.5;
    `}

  ${({ outlined = false }) =>
    outlined ? OutlinedContainerStyle : FilledContainerStyle}
`;

export const FilledContainerStyle = css<Props>`
  background: ${({ secondary, light }) =>
    (!!secondary && 'var(--secondary-color)') ||
    (!!light && 'var(--light-color)') ||
    'var(--primary-color)'};

  border: 2px solid transparent;
  font-weight: 600;

  color: ${({ secondary, light }) =>
    (!!secondary && 'var(--light-color)') ||
    (!!light && 'var(--dark-color)') ||
    'var(--light-color)'};

  :hover {
    background-color: ${({ secondary, light }) =>
      (!!secondary && 'var(--secondary-color-dark)') ||
      (!!light && 'var(--gray-light-color)') ||
      'var(--primary-color-dark)'};
  }

  :active {
    background: none;
    border: 2px solid
      ${({ secondary, light }) =>
        (!!secondary && 'var(--secondary-color)') ||
        (!!light && 'var(--light-color)') ||
        'var(--primary-color)'};

    color: ${({ secondary, light }) =>
      (!!secondary && 'var(--secondary-color)') ||
      (!!light && 'var(--light-color)') ||
      'var(--primary-color)'};

    transition: 0s;
  }

  @media (max-width: 425px) {
    font-size: 1.2rem;
  }
`;

export const OutlinedContainerStyle = css<Props>`
  background: none;
  font-weight: 500;

  border: 2px solid
    ${({ secondary, light }) =>
      (!!secondary && 'var(--secondary-color)') ||
      (!!light && 'var(--light-color)') ||
      'var(--primary-color)'};

  color: ${({ secondary, light }) =>
    (!!secondary && 'var(--secondary-color)') ||
    (!!light && 'var(--light-color)') ||
    'var(--primary-color)'};

  :hover {
    background-color: ${({ secondary, light }) =>
      (!!secondary && 'var(--secondary-transparent-color-dark)') ||
      (!!light && 'var(--gray-transparent-color)') ||
      'var(--primary-transparent-color-dark)'};
  }

  :active {
    background: ${({ secondary, light }) =>
      (!!secondary && 'var(--secondary-color)') ||
      (!!light && 'var(--light-color)') ||
      'var(--primary-color)'};

    color: ${({ secondary, light }) =>
      (!!secondary && 'var(--light-color)') ||
      (!!light && 'var(--primary-color)') ||
      'var(--light-color)'};

    transition: 0s;
  }

  @media (max-width: 425px) {
    font-size: 1rem;
  }
`;
