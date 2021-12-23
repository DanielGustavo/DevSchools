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

export interface AddPersonInClassroomParams {
  personId: string;
  classroomId: string;
}

export interface GetPersonsFromClassroomParams {
  classroomId: string;
  page?: number;
}

export interface DeleteClassroomResponse {
  message: string;
}

export interface GetClassroomResponse extends Classroom {
  subjects: Subject[];
  persons: Person[];
}

export interface AddPersonInClassroomResponse {
  classroom: Classroom;
  person: Person;
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

export const addPersonInClassroom = async ({
  personId,
  classroomId,
}: AddPersonInClassroomParams) => {
  try {
    const data = (
      await api.post(`/classrooms/${classroomId}/persons`, { personId })
    ).data as AddPersonInClassroomResponse;

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getStudentsFromClassroom = async ({
  classroomId,
  page = 1,
}: GetPersonsFromClassroomParams) => {
  try {
    const data = (
      await api.get(`/classrooms/${classroomId}/persons/${page}?role=student`)
    ).data as Person[];

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getTeachersFromClassroom = async ({
  classroomId,
  page = 1,
}: GetPersonsFromClassroomParams) => {
  try {
    const data = (
      await api.get(`/classrooms/${classroomId}/persons/${page}?role=teacher`)
    ).data as Person[];

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
