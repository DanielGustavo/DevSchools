import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import Person from '../entities/Person';

interface Request {
  page?: number;
}

export const getStudentsFromSchool = async (params?: Request) => {
  try {
    const page = params?.page ?? 1;

    const data = (await (
      await api.get(`/schools/students/${page}`)
    ).data) as Person[];

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
