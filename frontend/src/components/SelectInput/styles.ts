import styled from 'styled-components';
import SelectComponent from 'react-select';

export const Container = styled.div``;

export const Select = styled(SelectComponent)`
  border: 2px solid var(--dark-color) !important;
  border-radius: 4px !important;

  margin: 0;
  padding: 0;

  div:nth-child(3) {
    border: none;
    margin: 0;
    padding: 0.7rem;

    div {
      margin: 0;
    }
  }

  div:nth-child(4) {
    div {
      div {
        padding: 0.7rem !important;
        border-radius: 0.2rem;
        cursor: pointer;

        &:hover {
          background: var(--gray-light-color);
        }
      }
    }
  }

  span {
    display: none !important;
  }

  div div {
    padding: 0 !important;
  }

  color: var(--dark-color) !important;
  font-size: 0.8rem !important;

  width: 100% !important;
  height: 100% !important;

  @media (max-width: 767px) {
    font-size: 1rem !important;
  }
`;

export const ErrorMessage = styled.span`
  font-size: 0.7rem;
  color: var(--danger-color);
`;
