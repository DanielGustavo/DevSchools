import React, { useEffect, useState } from 'react';
import * as yup from 'yup';

import FormModal from '../../../../components/FormModal';
import SelectInput, { Option } from '../../../../components/SelectInput';
import { ModalParams } from '../../../../components/Modal';

import { getSubjectsFromSchool } from '../../../../services/getSubjectsFromSchool.service';
import { addSubjectInClassroom } from '../../../../services/addSubjectInClassroom.service';

import Subject from '../../../../entities/Subject';

const schema = yup.object().shape({
  subject: yup.string().required().uuid(),
});

async function loadOptions(page: number) {
  const subjects = (await getSubjectsFromSchool({ page })) ?? [];

  const options = subjects.map(({ id, title }) => ({
    label: title,
    value: id,
  }));

  return options;
}

interface FormValues {
  subject: string;
}

interface AddSubjectModalParams extends ModalParams {
  onAdd?: (subject: Subject) => void;
  data?: {
    classroom: {
      title: string;
      id: string;
    };
  };
}

const AddSubjectModal: React.FC<AddSubjectModalParams> = ({
  open,
  handleClose,
  onAdd,
  data,
}) => {
  const [options, setOptions] = useState<Option[]>([]);

  const classroom = data?.classroom;

  useEffect(() => {
    (async () => {
      const loadedOptions = await loadOptions(1);

      setOptions((currentOptions) => [...currentOptions, ...loadedOptions]);
    })();
  }, [setOptions]);

  async function handleSubmit({ subject: subjectId }: FormValues) {
    if (!classroom) return;

    const subject = (
      await addSubjectInClassroom({
        classroomId: classroom.id,
        subjectId,
      })
    )?.subject;

    if (subject && onAdd) {
      onAdd(subject);
    }
  }

  return (
    <FormModal
      onConfirm={handleSubmit}
      schema={schema}
      open={open}
      handleClose={handleClose}
    >
      <h2>Insert a subject in {`"${classroom?.title}"`}</h2>

      <SelectInput
        name="subject"
        placeholder="Select a subject"
        options={options}
        loadOptions={loadOptions}
      />
    </FormModal>
  );
};

export default AddSubjectModal;
