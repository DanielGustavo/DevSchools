import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  outlined?: boolean;
  secondary?: boolean;
  light?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}>{children}</Container>
);

export default Button;
