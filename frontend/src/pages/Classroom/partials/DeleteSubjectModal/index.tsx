import React from 'react';

import { ModalParams } from '../../../../components/Modal';
import SimpleModal from '../../../../components/SimpleModal';

import { deleteSubjectFromClassroom } from '../../../../services/deleteSubjectFromClassroom.service';

import Subject from '../../../../entities/Subject';

interface DeleteSubjectModalParams extends ModalParams {
  onDelete?: (subject: Subject) => void;
  data?: {
    classroom: { title: string; id: string };
    title: string;
    id: string;
  };
}

const DeleteSubjectModal: React.FC<DeleteSubjectModalParams> = ({
  open,
  handleClose,
  onDelete,
  data,
}) => {
  const classroom = data?.classroom;
  const subjectTitle = data?.title;
  const subjectId = data?.id;

  async function handleSubmit() {
    if (!classroom || !subjectId) return;

    const subject = (
      await deleteSubjectFromClassroom({ classroomId: classroom.id, subjectId })
    )?.subject;

    if (subject && onDelete) {
      onDelete(subject);
    }
  }

  return (
    <SimpleModal onConfirm={handleSubmit} open={open} handleClose={handleClose}>
      <h2>
        Do you really want to remove {`"${subjectTitle}"`} from
        {`"${classroom?.title}"`}
      </h2>
    </SimpleModal>
  );
};

export default DeleteSubjectModal;
