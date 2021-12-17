import React, { useState } from 'react';

import BoxList from '../../../../components/BoxList';
import AddStudentModal from '../AddStudentModal';
import DeleteStudentModal from '../DeleteStudentModal';

import useModal from '../../../../hooks/useModal';

import { getStudentsFromSchool } from '../../../../services/School.service';
import { Person } from '../../../../services/Student.service';

const StudentsFromSchoolBoxList: React.FC = () => {
  const [students, setStudents] = useState([] as Person[]);

  const { modals, openModal, closeModal } = useModal([
    'addStudent',
    'deleteStudent',
  ]);

  async function loadStudents(page: number) {
    const loadedStudents = (await getStudentsFromSchool({ page })) ?? [];

    setStudents([...students, ...loadedStudents]);
    return loadedStudents;
  }

  function addStudent(student: Person) {
    setStudents([...students, student]);
  }

  function deleteStudent(student: Person) {
    setStudents([...students.filter(({ id }) => id !== student.id)]);
  }

  return (
    <>
      <AddStudentModal
        open={modals.addStudent.open}
        handleClose={() => closeModal('addStudent')}
        onAdd={addStudent}
      />
      <DeleteStudentModal
        open={modals.deleteStudent.open}
        data={modals.deleteStudent.data}
        handleClose={() => closeModal('deleteStudent')}
        onDelete={deleteStudent}
      />

      <BoxList
        title="students"
        itemTitleProperty="name"
        items={students}
        loadItems={loadStudents}
        onAdd={() => openModal('addStudent')}
        onDelete={(student) => openModal('deleteStudent', student)}
      />
    </>
  );
};

export default StudentsFromSchoolBoxList;
