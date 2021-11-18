import styled from 'styled-components';

import FormComponent from '../../components/Form';
import GlobalButton from '../../components/Button';

import { ContainerBreakpoints } from '../../styles';

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

export const SecondaryButton = styled(GlobalButton)`
  color: var(--secondary-color);
  border-color: var(--secondary-color);

  :active {
    background: var(--secondary-color);
    color: var(--light-color);
    transition: 0s;
  }

  padding: 0.7rem 0;
`;

export const Form = styled(FormComponent)`
  flex: 1;
  display: flex;
  flex-direction: column;

  h1 {
    color: var(--primary-color);
    text-transform: capitalize;

    margin-bottom: 20px;
  }
`;

export const InputsWrapper = styled.div`
  width: 100%;

  div + div {
    margin-top: 5px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${SecondaryButton} {
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

  margin-top: 20px;
`;
