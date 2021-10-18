import { toast } from 'react-toastify';

import api from '../helpers/api';

interface SignUp {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
}

interface SignInRequest {
  email: string;
  password: string;
}

interface SignUpResponse {
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

interface SignInResponse {
  user: {
    id: string;
    email: string;
    is_a_school: boolean;
    avatar_filename: string | null;
    created_at: string;
    updated_at: string;
  };
  token: string;
  school: {
    id: string;
    name: string;
    user_id: string;
    created_at: string;
    updated_at: string;
  };
}

interface ErrorResponse {
  response: {
    data: {
      error: string;
    };
  };
}

export const signIn = async (
  requestBody: SignInRequest
): Promise<SignInResponse | undefined> => {
  try {
    const data = (await api.post('/auth/schools', requestBody))
      .data as SignInResponse;

    window.localStorage.setItem('DevSchools:token', data.token);
    window.localStorage.setItem(
      'DevSchools:user',
      JSON.stringify({
        schoolId: data.school.id,
        userId: data.user.id,
        name: data.school.name,
        email: data.user.email,
        isASchool: data.user.is_a_school,
        avatarFilename: data.user.avatar_filename,
      })
    );

    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    return data;
  } catch (error) {
    const errorMessage = (error as ErrorResponse)?.response?.data?.error;

    toast(errorMessage, {
      type: 'error',
    });

    return undefined;
  }
};

export const signUp = async (
  requestBody: SignUp
): Promise<SignUpResponse | undefined> => {
  try {
    const data = (await api.post('/schools', requestBody))
      .data as SignUpResponse;

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
