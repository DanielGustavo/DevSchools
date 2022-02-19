import { LinkProps } from 'react-router-dom';
import React from 'react';

import { Container } from './styles';

export interface Props extends LinkProps {
  outlined?: boolean | number;
  secondary?: boolean | number;
  light?: boolean | number;
  disabled?: boolean | number;
}

const ButtonLink: React.FC<Props> = ({
  children,
  outlined,
  secondary,
  light,
  disabled,
  ...rest
}) => (
  <Container
    {...rest}
    outlined={outlined ? 1 : 0}
    secondary={secondary ? 1 : 0}
    light={light ? 1 : 0}
    disabled={disabled ? 1 : 0}
  >
    {children}
  </Container>
);

export default ButtonLink;
