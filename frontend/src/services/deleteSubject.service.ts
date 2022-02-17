import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import Subject from '../entities/Subject';

interface Request {
  id: string;
}

export const deleteSubject = async ({ id }: Request) => {
  try {
    const subject = (await api.delete(`/subjects/${id}`)).data as Subject;

    return subject;
  } catch (error) {
    return handleApiError(error);
  }
};
