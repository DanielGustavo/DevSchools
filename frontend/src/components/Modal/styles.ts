import styled from 'styled-components';

export const BackgroundBlur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  z-index: 9999;
  background-color: var(--dark-transparent-color);
`;

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  z-index: 10000;

  padding: 20px 55px;
  border-radius: 10px;

  max-width: 45%;

  @media (max-width: 1024px) {
    max-width: 80%;
  }

  @media (max-width: 460px) {
    max-width: 90%;
    padding: 20px 20px;
  }

  @media (max-width: 280px) {
    max-width: 95%;
    padding: 10px 10px;
  }

  background: var(--light-color);
`;

export const ButtonsGroup = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;

  button {
    margin: 0 5px;
  }

  button:first-child {
    width: 60%;
    padding: 0.7rem 2.5rem;
  }

  button:nth-child(2) {
    flex: 1;
    padding: 0.7rem 1rem;
  }

  @media (max-width: 425px) {
    flex-direction: column;

    button {
      margin: 0 0 5px 0 !important;
      width: 100% !important;
      padding: 0.5rem 2.5rem !important;
    }

    button:nth-child(2) {
      padding: 0.4rem 2.5rem !important;
    }
  }
`;
