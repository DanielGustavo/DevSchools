import React, { useState } from 'react';

import BoxList from '../../../../components/BoxList';
import AddClassroomModal from '../AddClassroomModal';
import DeleteClassroomModal from '../DeleteClassroomModal';

import { Classroom } from '../../../../services/Classroom.service';
import { getClassroomsFromSchool } from '../../../../services/School.service';

import useModal from '../../../../hooks/useModal';

const ClassroomsFromSchoolBoxList: React.FC = () => {
  const [classrooms, setClassrooms] = useState([] as Classroom[]);

  const { modals, openModal, closeModal } = useModal([
    'deleteClassroom',
    'addClassroom',
  ]);

  async function loadClassrooms(page: number) {
    const loadedClassrooms =
      (await getClassroomsFromSchool({
        page,
      })) ?? [];

    setClassrooms(
      (classroomsState) =>
        [...classroomsState, ...loadedClassrooms] as Classroom[]
    );

    return loadedClassrooms;
  }

  function deleteClassroom(classroom: Classroom) {
    setClassrooms(classrooms.filter(({ id }) => id !== classroom.id));
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
        title="classrooms"
        items={classrooms}
        loadItems={loadClassrooms}
        onDelete={(classroom) => openModal('deleteClassroom', classroom)}
        onAdd={() => openModal('addClassroom')}
      />
    </>
  );
};

export default ClassroomsFromSchoolBoxList;
