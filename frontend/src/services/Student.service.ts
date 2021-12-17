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

export interface AddStudentInSchoolResponse extends Person {
  user: {
    email: string;
    is_a_school: boolean;
    avatar_filename: string | null;
    created_at: string;
    updated_at: string;
  };
  school: School;
}

export interface AddStudentInSchoolParams {
  name: string;
  email: string;
}

export interface DeleteStudentFromSchoolParams {
  id: string;
}

export const addStudentInSchool = async ({
  name,
  email,
}: AddStudentInSchoolParams) => {
  try {
    const student = (
      await api.post('/persons', { name, email, role: 'student' })
    ).data as AddStudentInSchoolResponse;

    return student;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteStudentFromSchool = async ({
  id,
}: DeleteStudentFromSchoolParams) => {
  try {
    const student = (await api.delete(`/persons/${id}`)).data as Person;

    return student;
  } catch (error) {
    return handleApiError(error);
  }
};
