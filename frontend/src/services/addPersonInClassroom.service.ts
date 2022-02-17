import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import Classroom from '../entities/Classroom';
import Person from '../entities/Person';

interface Request {
  personId: string;
  classroomId: string;
}

interface Response {
  classroom: Classroom;
  person: Person;
}

export const addPersonInClassroom = async ({
  personId,
  classroomId,
}: Request) => {
  try {
    const data = (
      await api.post(`/classrooms/${classroomId}/persons`, { personId })
    ).data as Response;

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
