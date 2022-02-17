import React from 'react';

import BoxList from '../../../../components/BoxList';

import { BoxListsWrapper } from './styles';

import Person from '../../../../entities/Person';
import Subject from '../../../../entities/Subject';

interface TeacherViewProps {
  loadSubjects: (page: number) => Promise<Subject[]>;
  loadStudents: (page: number) => Promise<Person[]>;
}

const TeacherView: React.FC<TeacherViewProps> = ({
  loadSubjects,
  loadStudents,
}) => (
  <>
    <BoxListsWrapper>
      <BoxList
        title="Students"
        itemTitleProperty="name"
        loadItems={loadStudents}
      />
      <BoxList title="Homeworks" />

      <BoxList title="Subjects" loadItems={loadSubjects} />
    </BoxListsWrapper>
  </>
);

export default TeacherView;
