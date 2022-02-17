import api from '../helpers/api';

import Classroom from '../entities/Classroom';
import Subject from '../entities/Subject';
import Person from '../entities/Person';

import { handleApiError } from '../utils/handleApiError';

interface Request {
  id: string;
}

export interface Response extends Classroom {
  subjects: Subject[];
  persons: Person[];
}

export const getClassroom = async ({ id }: Request) => {
  try {
    const data = (await api.get(`/classrooms/${id}`)).data as Response;

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
