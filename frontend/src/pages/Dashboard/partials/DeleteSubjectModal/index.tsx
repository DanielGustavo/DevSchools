import React from 'react';

import { ButtonsGroup } from '../../../../components/Modal/styles';
import Modal, { ModalParams } from '../../../../components/Modal';
import Button from '../../../../components/Button';

import { Subject, deleteSubject } from '../../../../services/Subject.service';

interface DeleteSubjectModalParams extends ModalParams {
  data?: Subject;
  onDelete?: (subject: Subject) => void;
}

const DeleteSubjectModal: React.FC<DeleteSubjectModalParams> = ({
  data: subject,
  onDelete,
  ...rest
}) => {
  function handlePrimaryButtonClick() {
    if (subject) {
      deleteSubject({ id: subject.id });

      if (onDelete) {
        onDelete(subject);
      }

      rest.handleClose();
    }
  }

  return (
    <Modal {...rest}>
      <h2>Do you really want delete the subject {`"${subject?.title}"`}?</h2>

      <ButtonsGroup>
        <Button autoFocus onClick={handlePrimaryButtonClick}>
          Yes
        </Button>
        <Button secondary outlined onClick={rest.handleClose}>
          No
        </Button>
      </ButtonsGroup>
    </Modal>
  );
};

export default DeleteSubjectModal;
