import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import Person from '../entities/Person';

import User from '../entities/User';
import School from '../entities/School';

interface Request {
  name: string;
  email: string;
  role: 'teacher' | 'student';
}

interface Response extends Person {
  user: User;
  school: School;
}

export const addPersonInSchool = async ({ name, email, role }: Request) => {
  try {
    const student = (await api.post('/persons', { name, email, role }))
      .data as Response;

    return student;
  } catch (error) {
    return handleApiError(error);
  }
};
