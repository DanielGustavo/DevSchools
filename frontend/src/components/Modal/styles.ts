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
