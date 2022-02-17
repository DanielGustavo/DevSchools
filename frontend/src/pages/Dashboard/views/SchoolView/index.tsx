import React from 'react';

import BoxList from '../../../../components/BoxList';
import { BoxListsWrapper } from './styles';

import AddClassroomModal from '../../partials/AddClassroomModal';
import DeleteClassroomModal from '../../partials/DeleteClassroomModal';
import AddSubjectModal from '../../partials/AddSubjectModal';
import DeleteSubjectModal from '../../partials/DeleteSubjectModal';
import AddStudentModal from '../../partials/AddStudentModal';
import DeleteStudentModal from '../../partials/DeleteStudentModal';
import AddTeacherModal from '../../partials/AddTeacherModal';
import DeleteTeacherModal from '../../partials/DeleteTeacherModal';

import { getTeachersFromSchool } from '../../../../services/getTeachersFromSchool.service';
import { getStudentsFromSchool } from '../../../../services/getStudentsFromSchool.service';
import { getSubjectsFromSchool } from '../../../../services/getSubjectsFromSchool.service';
import { getClassroomsFromSchool } from '../../../../services/getClassroomsFromSchool.service';

async function loadSubjects(page: number) {
  const subjects = (await getSubjectsFromSchool({ page })) ?? [];

  return subjects;
}

async function loadClassrooms(page: number) {
  const classrooms =
    (await getClassroomsFromSchool({
      page,
    })) ?? [];

  return classrooms;
}

async function loadStudents(page: number) {
  const students = (await getStudentsFromSchool({ page })) ?? [];

  return students;
}

async function loadTeachers(page: number) {
  const teachers = (await getTeachersFromSchool({ page })) ?? [];

  return teachers;
}

const SchoolView: React.FC = () => (
  <BoxListsWrapper>
    <BoxList
      title="classrooms"
      url="/classrooms/[id]"
      AddItemModal={AddClassroomModal}
      DeleteItemModal={DeleteClassroomModal}
      loadItems={loadClassrooms}
    />

    <BoxList
      title="subjects"
      AddItemModal={AddSubjectModal}
      DeleteItemModal={DeleteSubjectModal}
      loadItems={loadSubjects}
    />

    <BoxList
      title="students"
      itemTitleProperty="name"
      loadItems={loadStudents}
      AddItemModal={AddStudentModal}
      DeleteItemModal={DeleteStudentModal}
    />

    <BoxList
      title="teachers"
      itemTitleProperty="name"
      loadItems={loadTeachers}
      AddItemModal={AddTeacherModal}
      DeleteItemModal={DeleteTeacherModal}
    />
  </BoxListsWrapper>
);

export default SchoolView;
