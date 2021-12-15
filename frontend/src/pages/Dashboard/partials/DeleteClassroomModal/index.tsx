import React from 'react';

import { ModalParams } from '../../../../components/Modal';
import Button from '../../../../components/Button';

import {
  Classroom,
  deleteClassroom,
} from '../../../../services/Classroom.service';

import { Container } from './styles';

interface DeleteClassroomModalParams extends ModalParams {
  data?: Classroom;
  onDelete?: (classroom: Classroom) => void;
}

const DeleteClassroomModal: React.FC<DeleteClassroomModalParams> = ({
  data: classroom,
  onDelete,
  ...rest
}) => {
  function handlePrimaryButtonClick() {
    if (classroom) {
      deleteClassroom({ id: classroom.id });

      if (onDelete) {
        onDelete(classroom);
      }

      rest.handleClose();
    }
  }

  return (
    <Container {...rest}>
      <h2>
        Do you really want delete the classroom {`"${classroom?.title}"`}?
      </h2>

      <div>
        <Button autoFocus onClick={handlePrimaryButtonClick}>
          Yes
        </Button>
        <Button secondary outlined onClick={rest.handleClose}>
          No
        </Button>
      </div>
    </Container>
  );
};

export default DeleteClassroomModal;
