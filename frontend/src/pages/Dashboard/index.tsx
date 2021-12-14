import React, { useEffect, useState } from 'react';

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

  function incrementCurrentClassroomPage() {
    setCurrentClassroomPage(currentClassroomPage + 1);
  }

  return (
    <Container>
      <h1>Welcome, {user?.name}!</h1>

      <BoxList
        items={classrooms}
        ableToDelete
        onMaxScroll={incrementCurrentClassroomPage}
        onAdd={() => console.log('Add classroom...')}
      />
    </Container>
  );
};

export default Dashboard;
