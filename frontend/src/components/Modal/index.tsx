import React from 'react';

import { Container, Box, BackgroundBlur } from './styles';

interface ModalParams {
  open: boolean;
  handleClose: () => void;
}

const Modal: React.FC<ModalParams> = ({ open, handleClose, children }) => {
  if (!open) return <></>;

  return (
    <Container>
      <BackgroundBlur onClick={handleClose} />

      <Box>{children}</Box>
    </Container>
  );
};

export default Modal;
