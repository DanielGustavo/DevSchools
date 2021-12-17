import React from 'react';

import { ModalParams } from '../../../../components/Modal';
import SimpleModal from '../../../../components/SimpleModal';

import {
  Classroom,
  deleteClassroom,
} from '../../../../services/Classroom.service';

interface DeleteClassroomModalParams extends ModalParams {
  data?: Classroom;
  onDelete?: (classroom: Classroom) => void;
}

const DeleteClassroomModal: React.FC<DeleteClassroomModalParams> = ({
  data: classroom,
  onDelete,
  ...rest
}) => {
  function onConfirm() {
    if (classroom) {
      deleteClassroom({ id: classroom.id });

      if (onDelete) {
        onDelete(classroom);
      }
    }
  }

  return (
    <SimpleModal onConfirm={onConfirm} {...rest}>
      <h2>
        Do you really want delete the classroom {`"${classroom?.title}"`}?
      </h2>
    </SimpleModal>
  );
};

export default DeleteClassroomModal;
