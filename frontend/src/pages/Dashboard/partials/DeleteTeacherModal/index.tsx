import React from 'react';

import { ModalParams } from '../../../../components/Modal';
import SimpleModal from '../../../../components/SimpleModal';

import { deletePersonFromSchool } from '../../../../services/deletePersonFromSchool.service';

import Person from '../../../../entities/Person';

interface DeleteTeacherModalParams extends ModalParams {
  data?: Person;
  onDelete?: (teacher: Person) => void;
}

const DeleteTeacherModal: React.FC<DeleteTeacherModalParams> = ({
  data: teacher,
  onDelete,
  ...rest
}) => {
  async function onConfirm() {
    if (teacher) {
      await deletePersonFromSchool({ id: teacher.id });

      if (onDelete) {
        onDelete(teacher);
      }
    }
  }

  return (
    <SimpleModal onConfirm={onConfirm} {...rest}>
      <h2>
        Do you really want to remove the teacher {`"${teacher?.name}"`} from
        your school?
      </h2>
    </SimpleModal>
  );
};

export default DeleteTeacherModal;
