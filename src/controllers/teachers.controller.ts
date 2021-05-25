import { Request, Response } from 'express';

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
}

export default new TeachersController();
