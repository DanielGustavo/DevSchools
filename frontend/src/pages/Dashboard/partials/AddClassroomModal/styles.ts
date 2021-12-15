import styled from 'styled-components';

import Modal from '../../../../components/Modal';

export const Container = styled(Modal)`
  h2 {
    text-align: center;
  }

  div {
    display: flex;
    margin-top: 20px;
    width: 100%;

    button {
      margin: 0 5px;
    }

    button:first-child {
      width: 60%;
    }

    button:nth-child(2) {
      flex: 1;
    }
  }
`;
