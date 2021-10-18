import { toast } from 'react-toastify';

import api from '../helpers/api';

interface CreateProps {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
}

interface CreateResponse {
  id: string;
  name: string;
  user_id: string;
  user: {
    email: string;
    is_a_school: boolean;
    avatar_filename: string | null;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
}

interface ErrorResponse {
  response: {
    data: {
      error: string;
    };
  };
}

export const create = async (
  requestBody: CreateProps
): Promise<CreateResponse | undefined> => {
  try {
    const data = (await api.post('/schools', requestBody))
      .data as CreateResponse;

    toast('School registered successfully!', { type: 'success' });

    return data;
  } catch (error) {
    const errorMessage = (error as ErrorResponse)?.response?.data?.error;

    toast(errorMessage, {
      type: 'error',
    });

    return undefined;
  }
};
