import styled from 'styled-components';

import ButtonLink from '../../components/ButtonLink';

import { ContainerBreakpoints } from '../../styles';

export const Container = styled.div`
  h1 {
    font-size: 2.5rem;
  }
`;

export const HeroSection = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border-radius: 0 0 5vw 5vw;

  background: var(--primary-color);

  div {
    flex: 1;

    h1 {
      text-transform: capitalize;
      font-weight: 700;

      span {
        color: var(--light-color);
        font-weight: 600;
      }

      padding-bottom: 40px;
    }
  }

  @media (max-width: 1020px) {
    svg {
      display: none;
      width: 0;
      height: 0;
    }

    div {
      width: 100%;
      text-align: center;

      display: flex;
      flex-direction: column;
      align-items: center;

      a {
        width: 50%;
      }

      @media (max-width: 768px) {
        a {
          width: 95%;
        }
      }
    }
  }

  ${ContainerBreakpoints}
`;

export const SecondaryButtonLink = styled(ButtonLink)`
  display: none;

  @media (max-width: 425px) {
    margin-top: 10px;
    display: block;
  }
`;

export const SubHeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    font-weight: 600;
  }

  p {
    width: 70%;
    font-size: 1rem;
    font-weight: 400;
  }

  svg {
    height: auto;
    width: 80%;
  }

  ${ContainerBreakpoints}
`;
