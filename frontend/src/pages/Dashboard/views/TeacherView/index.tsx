import React from 'react';

import BoxList from '../../../../components/BoxList';

import { getClassroomsFromPerson } from '../../../../services/getClassroomsFromPerson.service';
import { getSubjectsFromTeacher } from '../../../../services/getSubjectsFromTeacher.service';

import useAuth from '../../../../hooks/useAuth';

import { BoxListsWrapper } from './styles';

const TeacherView: React.FC = () => {
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

  async function loadSubjects(page: number) {
    if (!user?.personId) return [];

    const subjects =
      (await getSubjectsFromTeacher({ page, id: user.personId })) ?? [];

    return subjects;
  }

  return (
    <BoxListsWrapper>
      <BoxList
        title="classrooms"
        url="/classrooms/[id]"
        loadItems={loadClassrooms}
      />
      <BoxList title="subjects" loadItems={loadSubjects} />
      <BoxList title="homeworks" />
    </BoxListsWrapper>
  );
};

export default TeacherView;
