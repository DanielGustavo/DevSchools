import styled from 'styled-components';

import {
  ContainerBreakpoints,
  Button as GlobalButton,
  OutlinedButton as GlobalOutlinedButton,
} from '../../styles';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 20px 0;

  svg {
    width: 45%;
    height: 45%;
    margin-right: 10%;

    padding-top: 9%;
    align-self: flex-end;
  }

  @media (max-width: 1020px) {
    svg {
      display: none;
    }
  }

  ${ContainerBreakpoints}
`;

export const Button = styled(GlobalButton)`
  color: var(--light-color);
  background: var(--primary-color);

  :hover {
    background-color: var(--primary-color-dark);
  }

  :active {
    background: none;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    transition: 0s;
  }

  padding: 0.7rem 0;
`;

export const OutlinedButton = styled(GlobalOutlinedButton)`
  color: var(--secondary-color);
  border-color: var(--secondary-color);

  :active {
    background: var(--secondary-color);
    color: var(--light-color);
    transition: 0s;
  }

  padding: 0.7rem 0;
`;

export const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;

  h1 {
    color: var(--primary-color);
    text-transform: capitalize;

    margin-bottom: 20px;
  }

  input {
    margin-bottom: 5px;
  }

  div {
    display: flex;
    justify-content: space-between;

    ${OutlinedButton} {
      width: 40%;
    }

    ${Button} {
      width: 58%;
    }

    @media (max-width: 425px) {
      flex-direction: column;

      button {
        margin-bottom: 5px;
        width: 100% !important;
      }
    }

    margin-top: 15px;
  }
`;

export const Input = styled.input`
  padding: 0.7rem;
  border: 2px solid var(--dark-color);
  border-radius: 4px;

  color: var(--dark-color);
`;
