import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import Subject from '../entities/Subject';

interface Request {
  page?: number;
}

export const getSubjectsFromSchool = async (params?: Request) => {
  try {
    const page = params?.page ?? 1;

    const data = (await (
      await api.get(`/schools/subjects/${page}`)
    ).data) as Subject[];

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
