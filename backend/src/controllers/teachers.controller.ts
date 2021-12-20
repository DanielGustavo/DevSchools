import { Request, Response } from 'express';

import getTeacherByPersonIdService from '../services/getTeacherByPersonId.service';
import getSubjectsByTeacherIdService from '../services/getSubjectsByTeacherId.service';

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

  async listSubjects(request: Request, response: Response) {
    const { person, school } = request.user;
    const schoolId = (school?.id || person?.schoolId) as string;

    const { personId: teacherId, page } = request.params;

    const subjects = await getSubjectsByTeacherIdService({
      schoolId,
      teacherId,
      page: parseInt(page, 10),
    });

    return response.json(subjects);
  }
}

export default new TeachersController();
