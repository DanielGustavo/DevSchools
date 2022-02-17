import { toast } from 'react-toastify';

import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import Person from '../entities/Person';
import User from '../entities/User';

interface Request {
  name: string;
  password: string;
  passwordConfirmation: string;
  token: string;
}

interface Response extends Person {
  user: User;
}

export const setupPerson = async ({
  name,
  password,
  passwordConfirmation,
  token,
}: Request) => {
  try {
    const person = (
      await api.put(
        `/persons/setup`,
        { name, password, passwordConfirmation },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    ).data as Response;

    toast('Account setted up successfully!', { type: 'success' });

    return person;
  } catch (error) {
    return handleApiError(error);
  }
};
