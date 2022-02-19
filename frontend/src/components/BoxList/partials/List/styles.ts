import styled from 'styled-components';
import ReactLoading from 'react-loading';

export const Container = styled.ul`
  margin-top: 0.8rem;
  list-style: none;

  overflow-y: auto;
  overflow-x: hidden;
  max-height: 200px;

  li + li {
    margin-top: 5px;
  }

  @media (max-width: 1439px) {
    max-height: 150px;
  }

  @media (max-width: 425px) {
    max-height: 135px;
  }

  /* ===== Scrollbar CSS ===== */
  /* Firefox */
   {
    scrollbar-width: auto;
    scrollbar-color: var(--primary-color);
  }

  /* Chrome, Edge, and Safari */
  ::-webkit-scrollbar {
    width: 0.3rem;
  }

  ::-webkit-scrollbar-track {
    background: var(--primary-color-dark);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--dark-color);
    border-radius: 10px;
  }
`;

export const EmptyMessage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  color: var(--gray-color);
  font-size: 0.8rem;
`;

export const LoadingIcon = styled(ReactLoading)`
  margin: 10px auto 0 auto;

  height: 1.3rem !important;
  width: 1.3rem !important;
`;
