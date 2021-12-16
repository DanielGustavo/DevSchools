import React, { useEffect, useState } from 'react';

import BoxList from '../../../../components/BoxList';
import AddClassroomModal from '../AddClassroomModal';
import DeleteClassroomModal from '../DeleteClassroomModal';

import { Classroom } from '../../../../services/Classroom.service';
import { getClassroomsFromSchool } from '../../../../services/School.service';
import useModal from '../../../../hooks/useModal';

const ClassroomsFromSchoolBoxList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reachedLastPage, setReachedLastPage] = useState(false);
  const [classrooms, setClassrooms] = useState([] as Classroom[]);

  const { modals, openModal, closeModal } = useModal([
    'deleteClassroom',
    'addClassroom',
  ]);

  useEffect(() => {
    async function loadClassrooms() {
      const loadedClassrooms = await getClassroomsFromSchool({
        page: currentPage,
      });

      if (loadedClassrooms?.length === 0) {
        setReachedLastPage(true);
      }

      setClassrooms(
        (classroomsState) =>
          [...classroomsState, ...(loadedClassrooms ?? [])] as Classroom[]
      );
    }

    loadClassrooms();
  }, [setClassrooms, currentPage]);

  function incrementCurrentPage() {
    if (reachedLastPage) return;

    setCurrentPage(currentPage + 1);
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
    <>
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

      <BoxList
        items={classrooms}
        onMaxScroll={incrementCurrentPage}
        onDelete={(classroom) => openModal('deleteClassroom', classroom)}
        onAdd={() => openModal('addClassroom')}
      />
    </>
  );
};

export default ClassroomsFromSchoolBoxList;
