import React, { useEffect, useState } from 'react';
import * as yup from 'yup';

import FormModal from '../../../../components/FormModal';
import SelectInput, { Option } from '../../../../components/SelectInput';
import { ModalParams } from '../../../../components/Modal';

import { Subject } from '../../../../services/Subject.service';
import { getSubjectsFromSchool } from '../../../../services/School.service';
import { addSubjectInClassroom } from '../../../../services/Classroom.service';

const schema = yup.object().shape({
  subject: yup.string().required().uuid(),
});

interface FormValues {
  subject: string;
}

interface AddSubjectModalParams extends ModalParams {
  onAdd?: (subject: Subject) => void;
  data?: {
    title: string;
    id: string;
  };
}

const AddSubjectModal: React.FC<AddSubjectModalParams> = ({
  open,
  handleClose,
  onAdd,
  data: classroom,
}) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    async function loadOptions() {
      const subjects = (await getSubjectsFromSchool()) ?? [];

      const subjectsOptions = subjects.map(({ id, title }) => ({
        label: title,
        value: id,
      }));

      setOptions((currentOptions) => [...currentOptions, ...subjectsOptions]);
    }

    loadOptions();
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
      />
    </FormModal>
  );
};

export default AddSubjectModal;
