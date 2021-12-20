import React from 'react';

import SchoolView from './views/SchoolView';
import StudentView from './views/StudentView';
import TeacherView from './views/TeacherView';

import { Container } from './styles';

import useAuth from '../../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <h1>Welcome, {user?.name}!</h1>

      {user?.isASchool === true && <SchoolView />}

      {!user?.isASchool &&
        (user?.role === 'student' ? <StudentView /> : <TeacherView />)}
    </Container>
  );
};

export default Dashboard;
