import React from 'react';

import BoxList from '../../../../components/BoxList';

import { Subject } from '../../../../services/Subject.service';
import { Person } from '../../../../services/Person.service';

import { BoxListsWrapper } from './styles';

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
