import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import Classroom from '../entities/Classroom';

interface Request {
  page?: number;
}

export const getClassroomsFromSchool = async (params?: Request) => {
  try {
    const page = params?.page ?? 1;

    const data = (await api.get(`/schools/classrooms/${page}`))
      .data as Classroom[];

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
