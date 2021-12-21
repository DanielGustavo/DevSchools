import api from '../helpers/api';

import { Subject } from './Subject.service';

import { handleApiError } from '../utils/handleApiError';

interface GetSubjectsFromTeacherParams {
  page?: number;
  id: string;
}

export const getSubjectsFromTeacher = async ({
  page = 1,
  id,
}: GetSubjectsFromTeacherParams) => {
  try {
    const subjects = (await api.get(`/teachers/${id}/subjects/${page}`))
      ?.data as Subject[];

    return subjects;
  } catch (error) {
    return handleApiError(error);
  }
};
