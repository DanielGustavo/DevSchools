import React, { MutableRefObject, useEffect, useRef, useState } from 'react';

import BoxList from '../../components/BoxList';

import useAuth from '../../hooks/useAuth';

import {
  getClassroomsFromSchool,
  Classroom,
} from '../../services/School.service';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const [currentClassroomPage, setCurrentClassroomPage] = useState(1);
  const [classrooms, setClassrooms] = useState([] as Classroom[]);

  const classroomsBoxListRef = useRef() as MutableRefObject<HTMLUListElement>;

  const { user } = useAuth();

  useEffect(() => {
    async function loadClassrooms() {
      const loadedClassrooms = await getClassroomsFromSchool({
        page: currentClassroomPage,
      });

      setClassrooms(
        (classroomsState) =>
          [...classroomsState, ...(loadedClassrooms ?? [])] as Classroom[]
      );
    }

    loadClassrooms();
  }, [setClassrooms, currentClassroomPage]);

  useEffect(() => {
    classroomsBoxListRef.current?.addEventListener('scroll', () => {
      const { scrollHeight, offsetHeight, scrollTop } =
        classroomsBoxListRef.current;

      const scrolledToMaxScrollTop = scrollHeight - offsetHeight === scrollTop;

      if (scrolledToMaxScrollTop) {
        setCurrentClassroomPage(
          (currentClassroomPageState) => currentClassroomPageState + 1
        );
      }
    });
  }, [classroomsBoxListRef, setCurrentClassroomPage]);

  return (
    <Container>
      <h1>Welcome, {user?.name}!</h1>

      <BoxList
        ref={classroomsBoxListRef}
        items={classrooms}
        ableToAdd
        ableToDelete
      />
    </Container>
  );
};

export default Dashboard;
