import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import Classroom from '../entities/Classroom';
import Person from '../entities/Person';

interface Request {
  classroomId: string;
  personId: string;
}

interface Response {
  classroom: Classroom;
  person: Person;
}

export const deletePersonFromClassroom = async ({
  classroomId,
  personId,
}: Request) => {
  try {
    const data = (
      await api.delete(`/classrooms/${classroomId}/persons/${personId}`)
    ).data as Response;

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
