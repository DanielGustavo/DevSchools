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

async function loadOptions(page: number) {
  const teachers = (await getTeachersFromSchool({ page })) ?? [];

  const options = teachers.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  return options;
}

interface FormValues {
  teacher: string;
}

interface AddTeacherModalParams extends ModalParams {
  onAdd?: (person: Person) => void;
  data?: {
    classroom: {
      title: string;
      id: string;
    };
  };
}

const AddTeacherModal: React.FC<AddTeacherModalParams> = ({
  open,
  handleClose,
  onAdd,
  data,
}) => {
  const [options, setOptions] = useState<Option[]>([]);

  async function handleSubmit({ teacher: teacherId }: FormValues) {
    if (!data?.classroom) return;

    const person = (
      await addPersonInClassroom({
        classroomId: data?.classroom.id,
        personId: teacherId,
      })
    )?.person;

    if (person && onAdd) {
      onAdd(person);
    }
  }

  useEffect(() => {
    (async () => {
      const loadedOptions = await loadOptions(1);

      setOptions((currentOptions) => [...currentOptions, ...loadedOptions]);
    })();
  }, [setOptions]);

  return (
    <FormModal
      onConfirm={handleSubmit}
      schema={schema}
      open={open}
      handleClose={handleClose}
    >
      <h2>Insert a teacher in {`"${data?.classroom?.title}"`}</h2>

      <SelectInput
        name="teacher"
        placeholder="Select a teacher"
        options={options}
        loadOptions={loadOptions}
      />
    </FormModal>
  );
};

export default AddTeacherModal;
