import styled from 'styled-components';

import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';

export const PrimaryButton = styled(Button)`
  background: var(--primary-color);

  :hover {
    background: var(--primary-color-dark);
  }

  :active {
    background: none;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    transition: 0s;
  }
`;

export const SecondaryButton = styled(Button)`
  border-color: var(--secondary-color);
  color: var(--secondary-color);

  :active {
    background: var(--secondary-color-dark);
    color: var(--light-color);
    transition: 0s;
  }
`;

export const Container = styled(Modal)`
  text-align: center;

  div {
    display: flex;
    margin-top: 20px;
    width: 100%;

    button {
      margin: 0 5px;
    }

    ${PrimaryButton} {
      width: 60%;
    }

    ${SecondaryButton} {
      flex: 1;
    }
  }
`;
