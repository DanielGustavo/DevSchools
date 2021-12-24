import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import SchoolView from './views/SchoolView';
import StudentView from './views/StudentView';
import TeacherView from './views/TeacherView';

import {
  getClassroom,
  GetClassroomResponse,
  getSubjectsFromClassroom,
  getStudentsFromClassroom,
} from '../../services/Classroom.service';

import useAuth from '../../hooks/useAuth';

import { Container } from './styles';

interface UrlParams {
  id: string;
}

const Classroom: React.FC = () => {
  const [classroom, setClassroom] = useState<
    GetClassroomResponse | undefined
  >();

  const params = useRouteMatch().params as UrlParams;

  const { user } = useAuth();

  useEffect(() => {
    async function loadClassroom() {
      const loadedClassroom = await getClassroom({ id: params.id });

      setClassroom(loadedClassroom);
    }

    loadClassroom();
  }, [setClassroom]);

  async function loadSubjects(page: number) {
    const subjects =
      (await getSubjectsFromClassroom({
        classroomId: params.id,
        page,
      })) ?? [];

    return subjects;
  }

  async function loadStudents(page: number) {
    const students =
      (await getStudentsFromClassroom({
        classroomId: params.id,
        page,
      })) ?? [];

    return students;
  }

  return (
    <Container>
      {!user?.isASchool && <h1>{classroom?.title || 'Loading...'}</h1>}

      {user?.isASchool === true && <SchoolView loadSubjects={loadSubjects} />}

      {!user?.isASchool &&
        (user?.role === 'student' ? (
          <StudentView loadSubjects={loadSubjects} />
        ) : (
          <TeacherView
            loadStudents={loadStudents}
            loadSubjects={loadSubjects}
          />
        ))}
    </Container>
  );
};

export default Classroom;
