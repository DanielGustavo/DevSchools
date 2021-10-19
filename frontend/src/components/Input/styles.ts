import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  input {
    padding: 0.7rem;
    border: 2px solid var(--dark-color);
    border-radius: 4px;

    color: var(--dark-color);
  }
`;

export const ErrorMessage = styled.span`
  font-size: 0.7rem;
  color: var(--danger-color);
`;
