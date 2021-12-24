import React from 'react';

import { ModalParams } from '../../../../components/Modal';
import SimpleModal from '../../../../components/SimpleModal';
import { deletePersonFromClassroom } from '../../../../services/Classroom.service';

import { Person } from '../../../../services/Person.service';

interface DeletePersonModalParams extends ModalParams {
  onDelete?: (person: Person) => void;
  data?: {
    classroom: { title: string; id: string };
    name: string;
    id: string;
  };
}

const DeletePersonModal: React.FC<DeletePersonModalParams> = ({
  open,
  handleClose,
  onDelete,
  data,
}) => {
  const classroom = data?.classroom;
  const personName = data?.name;
  const personId = data?.id;

  async function handleSubmit() {
    if (!classroom || !personId) return;

    const person = (
      await deletePersonFromClassroom({ classroomId: classroom.id, personId })
    )?.person;

    if (person && onDelete) {
      onDelete(person);
    }
  }

  return (
    <SimpleModal onConfirm={handleSubmit} open={open} handleClose={handleClose}>
      <h2>
        Do you really want to remove {`"${personName}"`} from{' '}
        {`"${classroom?.title}"`}
      </h2>
    </SimpleModal>
  );
};

export default DeletePersonModal;
