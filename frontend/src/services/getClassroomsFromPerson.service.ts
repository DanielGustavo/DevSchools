import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import Classroom from '../entities/Classroom';

interface Request {
  id: string;
  page?: number;
}

export const getClassroomsFromPerson = async ({ id, page = 1 }: Request) => {
  try {
    const classrooms = (await api.get(`/persons/${id}/classrooms/${page}`))
      .data as Classroom[];

    return classrooms;
  } catch (error) {
    return handleApiError(error);
  }
};
