import { Request, Response } from 'express';

import getStudentByPersonIdService from '../services/getStudentByPersonId.service';
import answerHomeworkService from '../services/answerHomework.service';

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

  async answerAHomework(request: Request, response: Response) {
    const { person } = request.user;
    const { homeworkId } = request.params;
    const { answers } = request.body;

    const { student, homework } = await answerHomeworkService({
      homeworkId,
      answers,
      personId: person?.id as string,
    });

    return response.json({ student, homework });
  }
}

export default new StudentsController();
