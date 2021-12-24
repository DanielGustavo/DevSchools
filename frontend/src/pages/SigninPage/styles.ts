import styled from 'styled-components';

import FormComponent from '../../components/Form';

import { ContainerBreakpoints } from '../../styles';

export const Container = styled.section`
  display: flex;
  justify-content: space-between;

  h1 {
    font-size: 2.5rem;
  }

  svg {
    width: 50%;
    height: 50%;
    margin-left: 10%;
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
    display: flex;
    flex-direction: column;

    color: var(--primary-color);
    text-transform: capitalize;

    margin-bottom: 20px;
  }

  small {
    align-self: center;
    margin-top: 5px;

    a {
      color: var(--secondary-color);

      &:hover {
        color: var(--secondary-color-dark);
      }
    }
  }

  button {
    padding: 0.7rem 0;
    margin-top: 20px;
  }
`;

export const InputsWrapper = styled.div`
  width: 100%;

  div + div {
    margin-top: 5px;
  }
`;
