import { toast } from 'react-toastify';
import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import { Classroom } from './Classroom.service';
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

export interface User {
  email: string;
  is_a_school: boolean;
  avatar_filename: string | null;
  created_at: string;
  updated_at: string;
}

export interface AddPersonInSchoolResponse extends Person {
  user: User;
  school: School;
}

export interface SetupPersonResponse extends Person {
  user: User;
}

export interface AddPersonInSchoolParams {
  name: string;
  email: string;
  role: 'teacher' | 'student';
}

export interface DeletePersonFromSchoolParams {
  id: string;
}

export interface SetupPersonParams {
  name: string;
  password: string;
  passwordConfirmation: string;
  token: string;
}

export interface GetClassroomsFromPersonParams {
  id: string;
  page?: number;
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

export const setupPerson = async ({
  name,
  password,
  passwordConfirmation,
  token,
}: SetupPersonParams) => {
  try {
    const person = (
      await api.put(
        `/persons/setup`,
        { name, password, passwordConfirmation },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    ).data as SetupPersonResponse;

    toast('Account setted up successfully!', { type: 'success' });

    return person;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getClassroomsFromPerson = async ({
  id,
  page = 1,
}: GetClassroomsFromPersonParams) => {
  try {
    const classrooms = (await api.get(`/persons/${id}/classrooms/${page}`))
      .data as Classroom[];

    return classrooms;
  } catch (error) {
    return handleApiError(error);
  }
};
