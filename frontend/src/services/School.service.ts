import { toast } from 'react-toastify';

import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import { Classroom } from './Classroom.service';

interface CreateProps {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
}

interface GetClassroomsFromSchoolProps {
  page?: number;
}

export interface School {
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

export const create = async (
  requestBody: CreateProps
): Promise<School | undefined> => {
  try {
    const data = (await api.post('/schools', requestBody)).data as School;

    toast('School registered successfully!', { type: 'success' });

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getClassroomsFromSchool = async (
  props?: GetClassroomsFromSchoolProps
): Promise<Classroom[] | undefined> => {
  try {
    const page = props?.page ?? 1;

    const data = (await api.get(`/schools/classrooms/${page}`))
      .data as Classroom[];

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
