import { Request, Response } from 'express';

import createSubjectService from '../services/createSubject.service';

class SubjectsController {
  async store(request: Request, response: Response) {
    const subject = await createSubjectService({
      schoolId: request.user.school?.id as string,
      title: request.body.title,
    });

    return response.json(subject);
  }
}

export default new SubjectsController();
