import React from 'react';
import * as yup from 'yup';

import { ButtonsGroup } from '../../../../components/Modal/styles';
import Modal, { ModalParams } from '../../../../components/Modal';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Form from '../../../../components/Form';

import { addSubject, Subject } from '../../../../services/Subject.service';

interface FormValues {
  title: string;
}

interface AddSubjectModalParams extends ModalParams {
  onAdd?: (subject: Subject) => void;
}

const schema = yup.object().shape({
  title: yup.string().min(5).max(50).required(),
});

const AddSubjectModal: React.FC<AddSubjectModalParams> = ({
  onAdd,
  ...params
}) => {
  async function handleSubmit({ title }: FormValues) {
    const subject = await addSubject({ title });

    if (subject && onAdd) {
      onAdd(subject);
    }

    params.handleClose();
  }

  return (
    <Modal {...params}>
      <h2>Add a new subject</h2>

      <Form schema={schema} onValidSubmit={handleSubmit}>
        <Input autoFocus name="title" type="text" placeholder="title" />

        <ButtonsGroup>
          <Button type="submit">Add</Button>
          <Button type="button" secondary outlined onClick={params.handleClose}>
            Cancel
          </Button>
        </ButtonsGroup>
      </Form>
    </Modal>
  );
};

export default AddSubjectModal;
