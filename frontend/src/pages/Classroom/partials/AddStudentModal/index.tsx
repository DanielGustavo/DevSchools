import React, { useEffect, useState } from 'react';
import * as yup from 'yup';

import FormModal from '../../../../components/FormModal';
import SelectInput, { Option } from '../../../../components/SelectInput';
import { ModalParams } from '../../../../components/Modal';

import { getStudentsFromSchool } from '../../../../services/getStudentsFromSchool.service';
import { addPersonInClassroom } from '../../../../services/addPersonInClassroom.service';

import Person from '../../../../entities/Person';

const schema = yup.object().shape({
  student: yup.string().required().uuid(),
});

interface FormValues {
  student: string;
}

async function loadOptions(page: number) {
  const students = (await getStudentsFromSchool({ page })) ?? [];

  const options = students.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  return options;
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
  const [options, setOptions] = useState([] as Option[]);

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
      <h2>Insert a student in {`"${data?.classroom?.title}"`}</h2>

      <SelectInput
        name="student"
        placeholder="Select a student"
        options={options}
        loadOptions={loadOptions}
      />
    </FormModal>
  );
};

export default AddStudentModal;
