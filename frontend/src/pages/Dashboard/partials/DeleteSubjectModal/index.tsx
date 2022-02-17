import React from 'react';

import { ModalParams } from '../../../../components/Modal';
import SimpleModal from '../../../../components/SimpleModal';

import { deleteSubject } from '../../../../services/deleteSubject.service';

import Subject from '../../../../entities/Subject';

interface DeleteSubjectModalParams extends ModalParams {
  data?: Subject;
  onDelete?: (subject: Subject) => void;
}

const DeleteSubjectModal: React.FC<DeleteSubjectModalParams> = ({
  data: subject,
  onDelete,
  ...rest
}) => {
  function onConfirm() {
    if (subject) {
      deleteSubject({ id: subject.id });

      if (onDelete) {
        onDelete(subject);
      }
    }
  }

  return (
    <SimpleModal onConfirm={onConfirm} {...rest}>
      <h2>Do you really want delete the subject {`"${subject?.title}"`}?</h2>
    </SimpleModal>
  );
};

export default DeleteSubjectModal;
