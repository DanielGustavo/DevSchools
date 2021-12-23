import React, { useEffect, useState } from 'react';
import * as yup from 'yup';

import FormModal from '../../../../components/FormModal';
import SelectInput, { Option } from '../../../../components/SelectInput';
import { ModalParams } from '../../../../components/Modal';

import { Person } from '../../../../services/Person.service';
import { getTeachersFromSchool } from '../../../../services/School.service';
import { addPersonInClassroom } from '../../../../services/Classroom.service';

const schema = yup.object().shape({
  teacher: yup.string().required().uuid(),
});

interface FormValues {
  teacher: string;
}

interface AddTeacherModalParams extends ModalParams {
  onAdd?: (person: Person) => void;
  data?: {
    title: string;
    id: string;
  };
}

const AddTeacherModal: React.FC<AddTeacherModalParams> = ({
  open,
  handleClose,
  onAdd,
  data: classroom,
}) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    async function loadOptions() {
      const teachers = (await getTeachersFromSchool()) ?? [];

      const teachersOptions = teachers.map(({ id, name }) => ({
        label: name,
        value: id,
      }));

      setOptions((currentOptions) => [...currentOptions, ...teachersOptions]);
    }

    loadOptions();
  }, [setOptions]);

  async function handleSubmit({ teacher: teacherId }: FormValues) {
    if (!classroom) return;

    const person = (
      await addPersonInClassroom({
        classroomId: classroom.id,
        personId: teacherId,
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
      <h2>Insert a teacher in {`"${classroom?.title}"`}</h2>

      <SelectInput
        name="teacher"
        placeholder="Select a teacher"
        options={options}
      />
    </FormModal>
  );
};

export default AddTeacherModal;
