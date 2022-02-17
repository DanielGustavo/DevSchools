import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import Classroom from '../entities/Classroom';

interface Request {
  title: string;
}

export const addClassroom = async ({ title }: Request) => {
  try {
    const data = (await api.post(`/classrooms`, { title })).data as Classroom;

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
