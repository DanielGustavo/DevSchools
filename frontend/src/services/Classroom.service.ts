import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

export interface Classroom {
  id: string;
  title: string;
  school_id: string;
  created_at: string;
  updated_at: string;
}

interface DeleteClassroomProps {
  id: string;
}

interface AddClassroomProps {
  title: string;
}

interface DeleteClassroomResponse {
  message: string;
}

export const deleteClassroom = async ({ id }: DeleteClassroomProps) => {
  try {
    const data = (await api.delete(`/classrooms/${id}`))
      .data as DeleteClassroomResponse;

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const addClassroom = async ({ title }: AddClassroomProps) => {
  try {
    const data = (await api.post(`/classrooms`, { title })).data as Classroom;

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
