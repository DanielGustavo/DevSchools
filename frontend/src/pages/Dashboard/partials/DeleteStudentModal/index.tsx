import React from 'react';

import { ModalParams } from '../../../../components/Modal';
import SimpleModal from '../../../../components/SimpleModal';

import { deletePersonFromSchool } from '../../../../services/deletePersonFromSchool.service';

import Person from '../../../../entities/Person';

interface DeleteStudentModalParams extends ModalParams {
  data?: Person;
  onDelete?: (student: Person) => void;
}

const DeleteStudentModal: React.FC<DeleteStudentModalParams> = ({
  data: student,
  onDelete,
  ...rest
}) => {
  function onConfirm() {
    if (student) {
      deletePersonFromSchool({ id: student.id });

      if (onDelete) {
        onDelete(student);
      }
    }
  }

  return (
    <SimpleModal onConfirm={onConfirm} {...rest}>
      <h2>
        Do you really want to remove the student {`"${student?.name}"`} from
        your school?
      </h2>
    </SimpleModal>
  );
};

export default DeleteStudentModal;
