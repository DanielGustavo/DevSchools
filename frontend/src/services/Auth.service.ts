import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

interface SignInRequest {
  email: string;
  password: string;
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
  school?: {
    id: string;
    name: string;
    user_id: string;
    created_at: string;
    updated_at: string;
  };
  person?: {
    id: string;
    role: string;
    name: string;
    school_id: string;
    setted_up: boolean;
    user_id: string;
    created_at: string;
    updated_at: string;
  };
}

export const signIn = async (
  requestBody: SignInRequest
): Promise<SignInResponse | undefined> => {
  try {
    const data = (await api.post('/auth', requestBody)).data as SignInResponse;

    const userData = {
      userId: data.user.id,
      email: data.user.email,
      isASchool: data.user.is_a_school,
      avatarFilename: data.user.avatar_filename,
    };

    if (data.school) {
      Object.assign(userData, {
        schoolId: data.school.id,
        name: data.school.name,
      });
    } else if (data.person) {
      Object.assign(userData, {
        personId: data.person.id,
        name: data.person.name,
        role: data.person.role,
        schoolId: data.person.school_id,
        settedUp: data.person.setted_up,
      });
    }

    window.localStorage.setItem('DevSchools:token', data.token);
    window.localStorage.setItem('DevSchools:user', JSON.stringify(userData));

    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
