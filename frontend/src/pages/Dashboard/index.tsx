import React, { useEffect, useState } from 'react';

import BoxList from '../../components/BoxList';
import DeleteClassroomModal from './partials/DeleteClassroomModal';
import AddClassroomModal from './partials/AddClassroomModal';

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
    addClassroom: {
      open: false,
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

  function openModal(modalName: string, data?: any) {
    setModals({ ...modals, [modalName]: { open: true, data } });
  }

  function deleteClassroom(classroom: Classroom) {
    const classroomIndex = classrooms.findIndex(
      ({ id }) => id === classroom.id
    );

    classrooms.splice(classroomIndex, 1);
  }

  function addClassroom(classroom: Classroom) {
    setClassrooms([...classrooms, classroom]);
  }

  return (
    <Container>
      <DeleteClassroomModal
        open={modals.deleteClassroom.open}
        data={modals.deleteClassroom.data}
        handleClose={() => closeModal('deleteClassroom')}
        onDelete={deleteClassroom}
      />
      <AddClassroomModal
        open={modals.addClassroom.open}
        handleClose={() => closeModal('addClassroom')}
        onAdd={addClassroom}
      />

      <h1>Welcome, {user?.name}!</h1>

      <BoxList
        items={classrooms}
        onMaxScroll={incrementCurrentClassroomPage}
        onDelete={(classroom) => openModal('deleteClassroom', classroom)}
        onAdd={() => openModal('addClassroom')}
      />
    </Container>
  );
};

export default Dashboard;
