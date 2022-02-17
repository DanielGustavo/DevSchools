import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import Subject from '../entities/Subject';

interface Request {
  page?: number;
  id: string;
}

export const getSubjectsFromTeacher = async ({ page = 1, id }: Request) => {
  try {
    const subjects = (await api.get(`/teachers/${id}/subjects/${page}`))
      ?.data as Subject[];

    return subjects;
  } catch (error) {
    return handleApiError(error);
  }
};
