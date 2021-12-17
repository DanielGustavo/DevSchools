import React from 'react';

import useAuth from '../../hooks/useAuth';

import ClassroomsFromSchoolBoxList from './partials/ClassroomsFromSchoolBoxList';
import SubjectsFromSchoolBoxList from './partials/SubjectsFromSchoolBoxList';
import StudentsFromSchoolBoxList from './partials/StudentsFromSchoolBoxList';

import { Container, BoxListsWrapper } from './styles';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <h1>Welcome, {user?.name}!</h1>

      <BoxListsWrapper>
        <ClassroomsFromSchoolBoxList />
        <SubjectsFromSchoolBoxList />
      </BoxListsWrapper>

      <StudentsFromSchoolBoxList />
    </Container>
  );
};

export default Dashboard;
