import { css } from 'styled-components';

export const ContainerBreakpoints = css`
  @media (max-width: 768px) {
    padding-right: 3% !important;
    padding-left: 3% !important;
  }

  @media (min-width: 768px) {
    padding-right: 5% !important;
    padding-left: 5% !important;
  }

  @media (min-width: 1860px) {
    padding-right: 20% !important;
    padding-left: 20% !important;
  }

  @media (min-width: 2240px) {
    padding-right: 25% !important;
    padding-left: 25% !important;
  }
`;
