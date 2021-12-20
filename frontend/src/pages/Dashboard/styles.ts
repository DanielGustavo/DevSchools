import styled from 'styled-components';

import { ContainerBreakpoints } from '../../styles';

export const Container = styled.section`
  margin-top: 20px;
  margin-bottom: 20px;

  h1 {
    margin-bottom: 40px;
  }

  ${ContainerBreakpoints}
`;
