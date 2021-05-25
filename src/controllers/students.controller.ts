import { Request, Response } from 'express';

import getStudentByPersonIdService from '../services/getStudentByPersonId.service';

class StudentsController {
  async listStudent(request: Request, response: Response) {
    const { person, school } = request.user;
    const schoolId = (school?.id || person?.schoolId) as string;

    const student = await getStudentByPersonIdService({
      personId: request.params.personId,
      schoolId,
    });

    return response.json(student);
  }
}

export default new StudentsController();
