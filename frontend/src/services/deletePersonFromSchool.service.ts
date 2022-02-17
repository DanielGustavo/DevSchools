import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import Person from '../entities/Person';

interface Request {
  id: string;
}

export const deletePersonFromSchool = async ({ id }: Request) => {
  try {
    const student = (await api.delete(`/persons/${id}`)).data as Person;

    return student;
  } catch (error) {
    return handleApiError(error);
  }
};
