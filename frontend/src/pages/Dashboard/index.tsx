import React, { useEffect, useState } from 'react';

import BoxList from '../../components/BoxList';
import DeleteClassroomModal from './partials/DeleteClassroomModal';

import useAuth from '../../hooks/useAuth';

import { getClassroomsFromSchool } from '../../services/School.service';
import { Classroom } from '../../services/Classroom.service';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const [currentClassroomPage, setCurrentClassroomPage] = useState(1);
  const [classrooms, setClassrooms] = useState([] as Classroom[]);

  const [modals, setModals] = useState({
    deleteClassroom: {
      open: false,
      data: undefined,
    },
  });

  const { user } = useAuth();

  useEffect(() => {
    async function loadClassrooms() {
      const loadedClassrooms = await getClassroomsFromSchool({
        page: currentClassroomPage,
      });

      setClassrooms(
        (classroomsState) =>
          [...classroomsState, ...(loadedClassrooms ?? [])] as Classroom[]
      );
    }

    loadClassrooms();
  }, [setClassrooms, currentClassroomPage]);

  function incrementCurrentClassroomPage() {
    setCurrentClassroomPage(currentClassroomPage + 1);
  }

  function closeModal(modalName: string) {
    setModals({
      ...modals,
      [modalName]: { open: false, data: undefined },
    });
  }

  function openModal(modalName: string, data: any) {
    setModals({ ...modals, [modalName]: { open: true, data } });
  }

  function deleteClassroom(classroom: Classroom) {
    const classroomIndex = classrooms.findIndex(
      ({ id }) => id === classroom.id
    );

    classrooms.splice(classroomIndex, 1);
  }

  return (
    <Container>
      <DeleteClassroomModal
        open={modals.deleteClassroom.open}
        data={modals.deleteClassroom.data}
        handleClose={() => closeModal('deleteClassroom')}
        onDelete={deleteClassroom}
      />

      <h1>Welcome, {user?.name}!</h1>

      <BoxList
        items={classrooms}
        onMaxScroll={incrementCurrentClassroomPage}
        onDelete={(classroom) => openModal('deleteClassroom', classroom)}
        onAdd={() => console.log('Add classroom...')}
      />
    </Container>
  );
};

export default Dashboard;
