import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

interface Request {
  id: string;
}

interface Response {
  message: string;
}

export const deleteClassroom = async ({ id }: Request) => {
  try {
    const data = (await api.delete(`/classrooms/${id}`)).data as Response;

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
