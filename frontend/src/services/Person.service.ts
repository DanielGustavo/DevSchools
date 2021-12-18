import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import { School } from './School.service';

export interface Person {
  id: string;
  role: string;
  name: string;
  school_id: string;
  setted_up: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface AddPersonInSchoolResponse extends Person {
  user: {
    email: string;
    is_a_school: boolean;
    avatar_filename: string | null;
    created_at: string;
    updated_at: string;
  };
  school: School;
}

export interface AddPersonInSchoolParams {
  name: string;
  email: string;
  role: 'teacher' | 'student';
}

export interface DeletePersonFromSchoolParams {
  id: string;
}

export const addPersonInSchool = async ({
  name,
  email,
  role,
}: AddPersonInSchoolParams) => {
  try {
    const student = (await api.post('/persons', { name, email, role }))
      .data as AddPersonInSchoolResponse;

    return student;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deletePersonFromSchool = async ({
  id,
}: DeletePersonFromSchoolParams) => {
  try {
    const student = (await api.delete(`/persons/${id}`)).data as Person;

    return student;
  } catch (error) {
    return handleApiError(error);
  }
};
