import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';

import BoxList from '../../../../components/BoxList';
import AddStudentModal from '../../partials/AddStudentModal';
import AddTeacherModal from '../../partials/AddTeacherModal';
import AddSubjectModal from '../../partials/AddSubjectModal';
import DeletePersonModal from '../../partials/DeletePersonModal';
import DeleteSubjectModal from '../../partials/DeleteSubjectModal';
import EditClassroomModal from '../../partials/EditClassroomModal';

import { getTeachersFromClassroom } from '../../../../services/getTeachersFromClassroom.service';
import { getStudentsFromClassroom } from '../../../../services/getStudentsFromClassroom.service';
import {
  getClassroom,
  Response,
} from '../../../../services/getClassroom.service';

import useModal from '../../../../hooks/useModal';

import { BoxListsWrapper, TitleWrapper } from './styles';

import Subject from '../../../../entities/Subject';

interface UrlParams {
  id: string;
}

interface SchoolViewProps {
  loadSubjects: (page: number) => Promise<Subject[]>;
}

const SchoolView: React.FC<SchoolViewProps> = ({ loadSubjects }) => {
  const [classroom, setClassroom] = useState<Response | undefined>();

  const params = useRouteMatch().params as UrlParams;

  const { openModal, modals, closeModal } = useModal(['editClassroomModal']);

  useEffect(() => {
    async function loadClassroom() {
      const loadedClassroom = await getClassroom({ id: params.id });

      setClassroom(loadedClassroom);
    }

    loadClassroom();
  }, [setClassroom]);

  async function loadStudents(page: number) {
    const students =
      (await getStudentsFromClassroom({
        classroomId: params.id,
        page,
      })) ?? [];

    return students;
  }

  async function loadTeachers(page: number) {
    const teachers =
      (await getTeachersFromClassroom({
        classroomId: params.id,
        page,
      })) ?? [];

    return teachers;
  }

  return (
    <>
      {classroom && (
        <EditClassroomModal
          open={modals.editClassroomModal.open}
          handleClose={() => closeModal('editClassroomModal')}
          classroom={classroom}
          onEdit={(editedClassroom) => {
            setClassroom({ ...classroom, ...editedClassroom });
          }}
        />
      )}

      <TitleWrapper>
        <h1>{classroom?.title || 'Loading...'}</h1>

        <button type="button" onClick={() => openModal('editClassroomModal')}>
          <FiSettings />
        </button>
      </TitleWrapper>

      <BoxListsWrapper>
        <BoxList
          title="Students"
          itemTitleProperty="name"
          loadItems={loadStudents}
          DeleteItemModal={DeletePersonModal}
          AddItemModal={AddStudentModal}
          modalData={{ classroom }}
        />
        <BoxList
          title="Teachers"
          itemTitleProperty="name"
          loadItems={loadTeachers}
          AddItemModal={AddTeacherModal}
          DeleteItemModal={DeletePersonModal}
          modalData={{ classroom }}
        />

        <BoxList
          title="Subjects"
          loadItems={loadSubjects}
          AddItemModal={AddSubjectModal}
          DeleteItemModal={DeleteSubjectModal}
          modalData={{ classroom }}
        />
      </BoxListsWrapper>
    </>
  );
};

export default SchoolView;
