import React from 'react';

import useAuth from '../../hooks/useAuth';
import ClassroomsFromSchoolBoxList from './partials/ClassroomsFromSchoolBoxList';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <h1>Welcome, {user?.name}!</h1>

      <ClassroomsFromSchoolBoxList />
    </Container>
  );
};

export default Dashboard;
