import React from 'react';

import BoxList from '../../../../components/BoxList';

import Subject from '../../../../entities/Subject';

import { BoxListWrapper } from './styles';

interface StudentViewProps {
  loadSubjects: (page: number) => Promise<Subject[]>;
}

const StudentView: React.FC<StudentViewProps> = ({ loadSubjects }) => (
  <>
    <BoxListWrapper>
      <BoxList title="homeworks" />
      <BoxList title="subjects" loadItems={loadSubjects} />
    </BoxListWrapper>
  </>
);

export default StudentView;
