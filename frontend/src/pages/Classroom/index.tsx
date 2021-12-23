import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import BoxList from '../../components/BoxList';
import AddStudentModal from './partials/AddStudentModal';

import {
  getClassroom,
  GetClassroomResponse,
  getStudentsFromClassroom,
  getSubjectsFromClassroom,
  getTeachersFromClassroom,
} from '../../services/Classroom.service';

import { Container, BoxListsWrapper } from './styles';

interface UrlParams {
  id: string;
}

const Classroom: React.FC = () => {
  const [classroom, setClassroom] = useState<
    GetClassroomResponse | undefined
  >();

  const params = useRouteMatch().params as UrlParams;

  useEffect(() => {
    async function loadClassroom() {
      const loadedClassroom = await getClassroom({ id: params.id });

      setClassroom(loadedClassroom);
    }

    loadClassroom();
  }, [setClassroom]);

  async function loadStudents(page: number) {
    const students =
      (await getStudentsFromClassroom({
        classroomId: params.id,
        page,
      })) ?? [];

    return students;
  }

  async function loadTeachers(page: number) {
    const teachers =
      (await getTeachersFromClassroom({
        classroomId: params.id,
        page,
      })) ?? [];

    return teachers;
  }

  async function loadSubjects(page: number) {
    const subjects =
      (await getSubjectsFromClassroom({
        classroomId: params.id,
        page,
      })) ?? [];

    return subjects;
  }

  return (
    <Container>
      <h1>{classroom?.title || 'Loading...'}</h1>

      <BoxListsWrapper>
        <BoxList
          title="Students"
          itemTitleProperty="name"
          loadItems={loadStudents}
          AddItemModal={AddStudentModal}
          modalData={classroom}
        />
        <BoxList
          title="Teachers"
          itemTitleProperty="name"
          loadItems={loadTeachers}
          modalData={classroom}
        />

        <BoxList
          title="Subjects"
          loadItems={loadSubjects}
          modalData={classroom}
        />
      </BoxListsWrapper>
    </Container>
  );
};

export default Classroom;
