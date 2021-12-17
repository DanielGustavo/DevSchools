import React from 'react';

import { ButtonsGroup } from '../Modal/styles';
import Modal, { ModalParams } from '../Modal';
import Button from '../Button';

interface SimpleModalParams extends ModalParams {
  onConfirm?: () => void;
  firstButton?: string;
  secondButton?: string;
}

const SimpleModal: React.FC<SimpleModalParams> = ({
  children,
  onConfirm,
  firstButton,
  secondButton,
  ...rest
}) => {
  function handleConfirmation() {
    if (onConfirm) onConfirm();
    rest.handleClose();
  }

  return (
    <Modal {...rest}>
      {children}

      <ButtonsGroup>
        <Button autoFocus onClick={handleConfirmation}>
          {firstButton || 'Yes'}
        </Button>
        <Button secondary outlined onClick={rest.handleClose}>
          {secondButton || 'No'}
        </Button>
      </ButtonsGroup>
    </Modal>
  );
};

export default SimpleModal;
