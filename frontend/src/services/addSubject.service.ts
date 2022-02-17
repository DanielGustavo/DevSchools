import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import Subject from '../entities/Subject';

interface Request {
  title: string;
}

export const addSubject = async ({ title }: Request) => {
  try {
    const subject = (await api.post('/subjects', { title })).data as Subject;

    return subject;
  } catch (error) {
    return handleApiError(error);
  }
};
