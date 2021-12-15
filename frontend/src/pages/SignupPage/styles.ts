import styled from 'styled-components';

import FormComponent from '../../components/Form';

import { ContainerBreakpoints } from '../../styles';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 20px 0;

  h1 {
    font-size: 2.5rem;
  }

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

  button {
    padding: 0.7rem 0;
  }

  @media (min-width: 425px) {
    button:first-child {
      width: 58%;
    }

    button:nth-child(2) {
      flex: 1;
      margin-left: 2%;
    }
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
