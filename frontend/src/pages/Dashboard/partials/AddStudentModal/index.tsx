import React from 'react';
import * as yup from 'yup';

import { ModalParams } from '../../../../components/Modal';
import FormModal from '../../../../components/FormModal';
import Input from '../../../../components/Input';

import {
  addStudentInSchool,
  Person,
} from '../../../../services/Student.service';

interface FormValues {
  name: string;
  email: string;
}

interface AddStudentModalParams extends ModalParams {
  onAdd?: (student: Person) => void;
}

const schema = yup.object().shape({
  name: yup.string().min(5).max(100).required(),
  email: yup.string().email().required(),
});

const AddStudentModal: React.FC<AddStudentModalParams> = ({
  onAdd,
  ...rest
}) => {
  async function handleSubmit({ name, email }: FormValues) {
    const student = await addStudentInSchool({ name, email });

    if (onAdd && student) {
      onAdd(student);
    }

    rest.handleClose();
  }

  return (
    <FormModal schema={schema} onConfirm={handleSubmit} {...rest}>
      <h2>Add Student</h2>

      <Input autoFocus name="name" placeholder="student's name" />
      <Input name="email" placeholder="student's email" />
    </FormModal>
  );
};

export default AddStudentModal;
