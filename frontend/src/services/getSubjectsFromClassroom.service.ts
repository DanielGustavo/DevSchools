import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import Subject from '../entities/Subject';

interface Request {
  classroomId: string;
  page?: number;
}

export const getSubjectsFromClassroom = async ({
  classroomId,
  page = 1,
}: Request) => {
  try {
    const data = (await api.get(`/classrooms/${classroomId}/subjects/${page}`))
      .data as Subject[];

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
