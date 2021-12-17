import React from 'react';
import { AnyObjectSchema } from 'yup';

import { ButtonsGroup } from '../Modal/styles';
import Modal, { ModalParams } from '../Modal';
import Button from '../Button';
import Form from '../Form';

interface FormModalParams extends ModalParams {
  onConfirm?: (formValues: any) => Promise<void>;
  firstButton?: string;
  secondButton?: string;
  schema?: AnyObjectSchema;
}

const FormModal: React.FC<FormModalParams> = ({
  children,
  onConfirm,
  firstButton,
  secondButton,
  schema,
  ...rest
}) => {
  function handleConfirmation(formValues: any) {
    if (onConfirm) onConfirm(formValues);
    rest.handleClose();
  }

  return (
    <Modal {...rest}>
      <Form schema={schema} onValidSubmit={handleConfirmation}>
        {children}

        <ButtonsGroup>
          <Button type="submit">{firstButton || 'Ok'}</Button>

          <Button type="button" secondary outlined onClick={rest.handleClose}>
            {secondButton || 'Cancel'}
          </Button>
        </ButtonsGroup>
      </Form>
    </Modal>
  );
};

export default FormModal;
