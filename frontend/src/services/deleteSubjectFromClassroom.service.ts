import api from '../helpers/api';

import { handleApiError } from '../utils/handleApiError';

import Classroom from '../entities/Classroom';
import Subject from '../entities/Subject';

interface Request {
  classroomId: string;
  subjectId: string;
}

interface Response {
  classroom: Classroom;
  subject: Subject;
}

export const deleteSubjectFromClassroom = async ({
  classroomId,
  subjectId,
}: Request) => {
  try {
    const data = (
      await api.delete(`/classrooms/${classroomId}/subjects/${subjectId}`)
    ).data as Response;

    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
