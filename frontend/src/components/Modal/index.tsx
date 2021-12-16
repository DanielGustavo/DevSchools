import ReactDOM from 'react-dom';
import React from 'react';

import { Container, Box, BackgroundBlur, Global } from './styles';

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

  return ReactDOM.createPortal(
    <>
      <Global />
      <Container>
        <BackgroundBlur onClick={handleClose} />

        <Box {...rest}>{children}</Box>
      </Container>
    </>,
    document.querySelector('#modal-root') as HTMLDivElement
  );
};

export default Modal;
