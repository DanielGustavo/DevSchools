import React from 'react';

import { Container, Box, BackgroundBlur } from './styles';

export interface ModalParams {
  open: boolean;
  handleClose: () => void;
}

const Modal: React.FC<ModalParams> = ({
  open,
  handleClose,
  children,
  ...rest
}) => {
  if (!open) return <></>;

  return (
    <Container>
      <BackgroundBlur onClick={handleClose} />

      <Box {...rest}>{children}</Box>
    </Container>
  );
};

export default Modal;
