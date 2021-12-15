import React from 'react';
import * as yup from 'yup';

import Modal, { ModalParams } from '../../../../components/Modal';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Form from '../../../../components/Form';

import { ButtonsGroup } from '../../../../components/Modal/styles';

import {
  addClassroom,
  Classroom,
} from '../../../../services/Classroom.service';

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

    params.handleClose();
  }

  return (
    <Modal {...params}>
      <h2>Create a new classroom</h2>

      <Form schema={schema} onValidSubmit={handleSubmit}>
        <Input autoFocus name="title" type="text" placeholder="title" />

        <ButtonsGroup>
          <Button type="submit">Create</Button>
          <Button type="button" secondary outlined onClick={params.handleClose}>
            Cancel
          </Button>
        </ButtonsGroup>
      </Form>
    </Modal>
  );
};

export default AddClassroomModal;
