import React, { useEffect, useState } from 'react';

import BoxList from '../../../../components/BoxList';
import AddSubjectModal from '../AddSubjectModal';
import DeleteSubjectModal from '../DeleteSubjectModal';

import useModal from '../../../../hooks/useModal';

import { getSubjectsFromSchool } from '../../../../services/School.service';
import { Subject } from '../../../../services/Subject.service';

const SubjectsFromSchoolBoxList: React.FC = () => {
  const [subjects, setSubjects] = useState([] as Subject[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reachedLastPage, setReachedLastPage] = useState(false);

  const { modals, openModal, closeModal } = useModal([
    'addSubject',
    'deleteSubject',
  ]);

  useEffect(() => {
    async function loadSubjects() {
      const loadedSubjects =
        (await getSubjectsFromSchool({ page: currentPage })) ?? [];

      if (loadedSubjects?.length === 0) {
        setReachedLastPage(true);
      }

      setSubjects((subjectsState) => [...subjectsState, ...loadedSubjects]);
    }

    loadSubjects();
  }, [currentPage, setReachedLastPage, setSubjects]);

  function incrementCurrentPage() {
    if (reachedLastPage) return;

    setCurrentPage(currentPage + 1);
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
        onMaxScroll={incrementCurrentPage}
        onDelete={(subject) => openModal('deleteSubject', subject)}
        onAdd={() => openModal('addSubject')}
      />
    </>
  );
};

export default SubjectsFromSchoolBoxList;
