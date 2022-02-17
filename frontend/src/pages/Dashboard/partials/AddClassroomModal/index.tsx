import React from 'react';
import * as yup from 'yup';

import { ModalParams } from '../../../../components/Modal';
import FormModal from '../../../../components/FormModal';
import Input from '../../../../components/Input';

import Classroom from '../../../../entities/Classroom';

import { addClassroom } from '../../../../services/addClassroom.service';

interface FormValues {
  title: string;
}

interface AddClassroomModalParams extends ModalParams {
  onAdd?: (classroom: Classroom) => void;
}

const schema = yup.object().shape({
  title: yup.string().min(5).max(50).required(),
});

const AddClassroomModal: React.FC<AddClassroomModalParams> = ({
  onAdd,
  ...params
}) => {
  async function handleSubmit({ title }: FormValues) {
    const classroom = await addClassroom({ title });

    if (classroom && onAdd) {
      onAdd(classroom);
    }
  }

  return (
    <FormModal schema={schema} onConfirm={handleSubmit} {...params}>
      <h2>Create a new classroom</h2>

      <Input autoFocus name="title" type="text" placeholder="title" />
    </FormModal>
  );
};

export default AddClassroomModal;
