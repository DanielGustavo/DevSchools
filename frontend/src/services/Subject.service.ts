import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

export interface Subject {
  id: string;
  title: string;
  school_id: string;
  created_at: string;
  updated_at: string;
}

interface AddSubjectProps {
  title: string;
}

interface DeleteSubjectProps {
  id: string;
}

export const addSubject = async ({ title }: AddSubjectProps) => {
  try {
    const subject = (await api.post('/subjects', { title })).data as Subject;

    return subject;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteSubject = async ({ id }: DeleteSubjectProps) => {
  try {
    const subject = (await api.delete(`/subjects/${id}`)).data as Subject;

    return subject;
  } catch (error) {
    return handleApiError(error);
  }
};
