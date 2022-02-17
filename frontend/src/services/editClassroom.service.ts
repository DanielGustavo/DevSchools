import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import Subject from '../entities/Subject';

interface Request {
  classroomId: string;
  title: string;
}

export const editClassroom = async ({ classroomId, title }: Request) => {
  try {
    const data = (
      await api.put(`/classrooms/${classroomId}`, { newTitle: title })
    ).data as Subject;

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
