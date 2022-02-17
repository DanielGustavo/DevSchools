import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import Classroom from '../entities/Classroom';
import Subject from '../entities/Subject';

interface Request {
  subjectId: string;
  classroomId: string;
}

interface Response {
  classroom: Classroom;
  subject: Subject;
}

export const addSubjectInClassroom = async ({
  subjectId,
  classroomId,
}: Request) => {
  try {
    const data = (
      await api.post(`/classrooms/${classroomId}/subjects`, { subjectId })
    ).data as Response;

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
