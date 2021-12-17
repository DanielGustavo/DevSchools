import React from 'react';

import BoxList from '../../components/BoxList';

import AddClassroomModal from './partials/AddClassroomModal';
import DeleteClassroomModal from './partials/DeleteClassroomModal';
import AddSubjectModal from './partials/AddSubjectModal';
import DeleteSubjectModal from './partials/DeleteSubjectModal';
import AddStudentModal from './partials/AddStudentModal';
import DeleteStudentModal from './partials/DeleteStudentModal';

import {
  getClassroomsFromSchool,
  getStudentsFromSchool,
  getSubjectsFromSchool,
} from '../../services/School.service';

import useAuth from '../../hooks/useAuth';

import { Container, BoxListsWrapper } from './styles';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  async function loadSubjects(page: number) {
    const loadedSubjects = (await getSubjectsFromSchool({ page })) ?? [];

    return loadedSubjects;
  }

  async function loadClassrooms(page: number) {
    const loadedClassrooms =
      (await getClassroomsFromSchool({
        page,
      })) ?? [];

    return loadedClassrooms;
  }

  async function loadStudents(page: number) {
    const loadedStudents = (await getStudentsFromSchool({ page })) ?? [];

    return loadedStudents;
  }

  return (
    <Container>
      <h1>Welcome, {user?.name}!</h1>

      <BoxListsWrapper>
        <BoxList
          title="classrooms"
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
      </BoxListsWrapper>

      <BoxList
        title="students"
        itemTitleProperty="name"
        loadItems={loadStudents}
        AddItemModal={AddStudentModal}
        DeleteItemModal={DeleteStudentModal}
      />
    </Container>
  );
};

export default Dashboard;
