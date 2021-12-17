import React, { useState } from 'react';

import BoxList from '../../../../components/BoxList';
import AddSubjectModal from '../AddSubjectModal';
import DeleteSubjectModal from '../DeleteSubjectModal';

import useModal from '../../../../hooks/useModal';

import { getSubjectsFromSchool } from '../../../../services/School.service';
import { Subject } from '../../../../services/Subject.service';

const SubjectsFromSchoolBoxList: React.FC = () => {
  const [subjects, setSubjects] = useState([] as Subject[]);

  const { modals, openModal, closeModal } = useModal([
    'addSubject',
    'deleteSubject',
  ]);

  async function loadSubjects(page: number) {
    const loadedSubjects = (await getSubjectsFromSchool({ page })) ?? [];

    setSubjects((subjectsState) => [...subjectsState, ...loadedSubjects]);
    return loadedSubjects;
  }

  function addSubject(subject: Subject) {
    setSubjects([...subjects, subject]);
  }

  function deleteSubject(subject: Subject) {
    setSubjects(subjects.filter(({ id }) => id !== subject.id));
  }

  return (
    <>
      <AddSubjectModal
        open={modals.addSubject.open}
        handleClose={() => closeModal('addSubject')}
        onAdd={addSubject}
      />
      <DeleteSubjectModal
        open={modals.deleteSubject.open}
        data={modals.deleteSubject.data}
        handleClose={() => closeModal('deleteSubject')}
        onDelete={deleteSubject}
      />

      <BoxList
        title="subjects"
        items={subjects}
        loadItems={loadSubjects}
        onDelete={(subject) => openModal('deleteSubject', subject)}
        onAdd={() => openModal('addSubject')}
      />
    </>
  );
};

export default SubjectsFromSchoolBoxList;
