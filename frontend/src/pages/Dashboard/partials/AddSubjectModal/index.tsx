import React from 'react';
import * as yup from 'yup';

import { ModalParams } from '../../../../components/Modal';
import FormModal from '../../../../components/FormModal';
import Input from '../../../../components/Input';

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
  }

  return (
    <FormModal schema={schema} onConfirm={handleSubmit} {...params}>
      <h2>Add a new subject</h2>

      <Input autoFocus name="title" type="text" placeholder="title" />
    </FormModal>
  );
};

export default AddSubjectModal;
