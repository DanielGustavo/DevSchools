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

export interface AddSubjectInClassroomParams {
  subjectId: string;
  classroomId: string;
}

export interface DeletePersonFromClassroomParams {
  classroomId: string;
  personId: string;
}

export interface DeleteSubjectFromClassroomParams {
  classroomId: string;
  subjectId: string;
}

export interface ClassroomPaginationParams {
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

export interface DeletePersonFromClassroomResponse {
  classroom: Classroom;
  person: Person;
}

export interface DeleteSubjectFromClassroomResponse {
  classroom: Classroom;
  subject: Subject;
}

export interface AddSubjectInClassroomResponse {
  classroom: Classroom;
  subject: Subject;
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

export const addSubjectInClassroom = async ({
  subjectId,
  classroomId,
}: AddSubjectInClassroomParams) => {
  try {
    const data = (
      await api.post(`/classrooms/${classroomId}/subjects`, { subjectId })
    ).data as AddSubjectInClassroomResponse;

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getStudentsFromClassroom = async ({
  classroomId,
  page = 1,
}: ClassroomPaginationParams) => {
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
}: ClassroomPaginationParams) => {
  try {
    const data = (
      await api.get(`/classrooms/${classroomId}/persons/${page}?role=teacher`)
    ).data as Person[];

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getSubjectsFromClassroom = async ({
  classroomId,
  page = 1,
}: ClassroomPaginationParams) => {
  try {
    const data = (await api.get(`/classrooms/${classroomId}/subjects/${page}`))
      .data as Subject[];

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deletePersonFromClassroom = async ({
  classroomId,
  personId,
}: DeletePersonFromClassroomParams) => {
  try {
    const data = (
      await api.delete(`/classrooms/${classroomId}/persons/${personId}`)
    ).data as DeletePersonFromClassroomResponse;

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteSubjectFromClassroom = async ({
  classroomId,
  subjectId,
}: DeleteSubjectFromClassroomParams) => {
  try {
    const data = (
      await api.delete(`/classrooms/${classroomId}/subjects/${subjectId}`)
    ).data as DeleteSubjectFromClassroomResponse;

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
