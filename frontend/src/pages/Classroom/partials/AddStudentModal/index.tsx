import React, { useEffect, useState } from 'react';
import * as yup from 'yup';

import FormModal from '../../../../components/FormModal';
import SelectInput, { Option } from '../../../../components/SelectInput';
import { ModalParams } from '../../../../components/Modal';

import { Person } from '../../../../services/Person.service';
import { getStudentsFromSchool } from '../../../../services/School.service';
import { addPersonInClassroom } from '../../../../services/Classroom.service';

const schema = yup.object().shape({
  student: yup.string().required().uuid(),
});

interface FormValues {
  student: string;
}

interface AddStudentModalParams extends ModalParams {
  onAdd?: (person: Person) => void;
  data?: {
    classroom: {
      title: string;
      id: string;
    };
  };
}

const AddStudentModal: React.FC<AddStudentModalParams> = ({
  open,
  handleClose,
  onAdd,
  data,
}) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    async function loadOptions() {
      const students = (await getStudentsFromSchool()) ?? [];

      const studentsOptions = students.map(({ id, name }) => ({
        label: name,
        value: id,
      }));

      setOptions((currentOptions) => [...currentOptions, ...studentsOptions]);
    }

    loadOptions();
  }, [setOptions]);

  async function handleSubmit({ student: studentId }: FormValues) {
    if (!data?.classroom) return;

    const person = (
      await addPersonInClassroom({
        classroomId: data?.classroom.id,
        personId: studentId,
      })
    )?.person;

    if (person && onAdd) {
      onAdd(person);
    }
  }

  return (
    <FormModal
      onConfirm={handleSubmit}
      schema={schema}
      open={open}
      handleClose={handleClose}
    >
      <h2>Insert a student in {`"${data?.classroom?.title}"`}</h2>

      <SelectInput
        name="student"
        placeholder="Select a student"
        options={options}
      />
    </FormModal>
  );
};

export default AddStudentModal;
