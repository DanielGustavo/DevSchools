import React from 'react';
import * as yup from 'yup';

import FormModal from '../../../../components/FormModal';
import Input from '../../../../components/Input';
import { ModalParams } from '../../../../components/Modal';

import { addPersonInSchool, Person } from '../../../../services/Person.service';

interface AddTeacherModalParams extends ModalParams {
  onAdd?: (teacher: Person) => void;
}

interface FormValues {
  name: string;
  email: string;
}

const schema = yup.object().shape({
  name: yup.string().min(5).max(100).required(),
  email: yup.string().email().required(),
});

const AddTeacherModal: React.FC<AddTeacherModalParams> = ({
  onAdd,
  ...rest
}) => {
  async function handleSubmit({ name, email }: FormValues) {
    const teacher = await addPersonInSchool({ name, email, role: 'teacher' });

    if (onAdd && teacher) {
      onAdd(teacher);
    }
  }

  return (
    <FormModal onConfirm={handleSubmit} schema={schema} {...rest}>
      <h2>Add teacher</h2>

      <Input autoFocus name="name" placeholder="teacher's name" />
      <Input name="email" type="email" placeholder="teacher's email" />
    </FormModal>
  );
};

export default AddTeacherModal;
