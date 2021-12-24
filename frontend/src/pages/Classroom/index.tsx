import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import SchoolView from './views/SchoolView';

import {
  getClassroom,
  GetClassroomResponse,
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

  return (
    <Container>
      <h1>{classroom?.title || 'Loading...'}</h1>

      {user?.isASchool === true && <SchoolView />}
    </Container>
  );
};

export default Classroom;
