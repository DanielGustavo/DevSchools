import React from 'react';
import * as yup from 'yup';

import FormModal from '../../../../components/FormModal';
import Input from '../../../../components/Input';
import { ModalParams } from '../../../../components/Modal';

import {
  Classroom,
  editClassroom,
} from '../../../../services/Classroom.service';

const schema = yup.object().shape({
  title: yup.string().min(5).max(50).required(),
});

interface FormValues {
  title: string;
}

interface EditClassroomModalProps extends ModalParams {
  onEdit: (classroom: Classroom) => void;
  classroom?: Classroom;
}

const EditClassroomModal: React.FC<EditClassroomModalProps> = ({
  classroom,
  onEdit,
  ...rest
}) => {
  async function handleSubmit({ title }: FormValues) {
    if (!classroom) return;

    const editedClassroom = await editClassroom({
      classroomId: classroom.id,
      title,
    });

    if (editedClassroom) {
      onEdit(editedClassroom);
    }
  }

  return (
    <FormModal onConfirm={handleSubmit} schema={schema} {...rest}>
      <h2>Edit classroom {`"${classroom?.title}"`}</h2>

      <Input
        autoFocus
        placeholder="title"
        name="title"
        defaultValue={classroom?.title}
      />
    </FormModal>
  );
};

export default EditClassroomModal;
