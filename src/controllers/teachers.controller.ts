import { Request, Response } from 'express';

import getHomeworksByTeacherIdService from '../services/getHomeworksByTeacherId.service';
import getTeacherByPersonIdService from '../services/getTeacherByPersonId.service';

class TeachersController {
  async listTeacher(request: Request, response: Response) {
    const { person, school } = request.user;
    const schoolId = (school?.id || person?.schoolId) as string;

    const teacher = await getTeacherByPersonIdService({
      personId: request.params.personId,
      schoolId,
    });

    return response.json(teacher);
  }

  async listHomeworks(request: Request, response: Response) {
    const { school, person } = request.user;
    const { personId: teacherId, page } = request.params;
    const { classroomId, subjectId } = request.query;

    const schoolId = (school?.id || person?.schoolId) as string;

    const homeworks = await getHomeworksByTeacherIdService({
      page: parseInt(page, 10),
      schoolId,
      teacherId,
      classroomId: classroomId as string | undefined,
      subjectId: subjectId as string | undefined,
    });

    return response.json(homeworks);
  }
}

export default new TeachersController();
