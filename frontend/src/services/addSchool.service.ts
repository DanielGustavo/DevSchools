import { toast } from 'react-toastify';

import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import School from '../entities/School';

interface Request {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
}

export const addSchool = async (requestBody: Request) => {
  try {
    const data = (await api.post('/schools', requestBody)).data as School;

    toast('School registered successfully!', { type: 'success' });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
