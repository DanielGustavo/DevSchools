import { toast } from 'react-toastify';

import api from '../helpers/api';

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

interface ErrorResponse {
  response: {
    data: {
      error: string;
    };
  };
}

export const create = async (
  requestBody: CreateProps
): Promise<School | undefined> => {
  try {
    const data = (await api.post('/schools', requestBody)).data as School;

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

export const getClassroomsFromSchool = async (
  props?: GetClassroomsFromSchoolProps
): Promise<Classroom[] | undefined> => {
  try {
    const page = props?.page ?? 1;

    const data = (await api.get(`/schools/classrooms/${page}`))
      .data as Classroom[];

    return data;
  } catch (error) {
    const errorMessage = (error as ErrorResponse)?.response?.data?.error;

    toast(errorMessage, {
      type: 'error',
    });

    return undefined;
  }
};
