import { toast } from 'react-toastify';
import api from '../helpers/api';

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

interface DeleteClassroomResponse {
  message: string;
}

interface ErrorResponse {
  response: {
    data: {
      error: string;
    };
  };
}

export const deleteClassroom = async ({ id }: DeleteClassroomProps) => {
  try {
    const data = (await api.delete(`/classrooms/${id}`))
      .data as DeleteClassroomResponse;

    return data;
  } catch (error) {
    const errorMessage = (error as ErrorResponse)?.response?.data?.error;

    toast(errorMessage, {
      type: 'error',
    });

    return undefined;
  }
};
