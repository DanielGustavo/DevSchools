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

export const signIn = async (requestBody: SignInRequest) => {
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
};

export const signUp = async (requestBody: SignUp) => {
  const data = (await api.post('/schools', requestBody)).data as SignUpResponse;

  await signIn({ email: requestBody.email, password: requestBody.password });

  return data;
};
