import React from 'react';

import BoxList from '../../../../components/BoxList';

import { getClassroomsFromPerson } from '../../../../services/Person.service';

import useAuth from '../../../../hooks/useAuth';

import { BoxListsWrapper } from './styles';

const StudentView: React.FC = () => {
  const { user } = useAuth();

  async function loadClassrooms(page: number) {
    if (!user?.personId) return [];

    const classrooms =
      (await getClassroomsFromPerson({
        page,
        id: user.personId,
      })) ?? [];

    return classrooms;
  }

  return (
    <BoxListsWrapper>
      <BoxList title="classrooms" loadItems={loadClassrooms} />
    </BoxListsWrapper>
  );
};

export default StudentView;
