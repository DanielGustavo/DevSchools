import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import Person from '../entities/Person';

interface Request {
  classroomId: string;
  page?: number;
}

export const getStudentsFromClassroom = async ({
  classroomId,
  page = 1,
}: Request) => {
  try {
    const data = (
      await api.get(`/classrooms/${classroomId}/persons/${page}?role=student`)
    ).data as Person[];

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
