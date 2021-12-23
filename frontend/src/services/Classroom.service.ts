import api from '../helpers/api';

import { Person } from './Person.service';
import { Subject } from './Subject.service';

import { handleApiError } from '../utils/handleApiError';

export interface Classroom {
  id: string;
  title: string;
  school_id: string;
  created_at: string;
  updated_at: string;
}

export interface PropsWithId {
  id: string;
}

export interface AddClassroomParams {
  title: string;
}

export interface DeleteClassroomResponse {
  message: string;
}

export interface GetClassroomResponse extends Classroom {
  subjects: Subject[];
  persons: Person[];
}
export const deleteClassroom = async ({ id }: PropsWithId) => {
  try {
    const data = (await api.delete(`/classrooms/${id}`))
      .data as DeleteClassroomResponse;

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const addClassroom = async ({ title }: AddClassroomParams) => {
  try {
    const data = (await api.post(`/classrooms`, { title })).data as Classroom;

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getClassroom = async ({ id }: PropsWithId) => {
  try {
    const data = (await api.get(`/classrooms/${id}`))
      .data as GetClassroomResponse;

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
