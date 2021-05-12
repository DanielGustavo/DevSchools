import { Request, Response } from 'express';

import createSubjectService from '../services/createSubject.service';
import updateASubjectByIdService from '../services/updateASubjectById.service';

class SubjectsController {
  async store(request: Request, response: Response) {
    const subject = await createSubjectService({
      schoolId: request.user.school?.id as string,
      title: request.body.title,
    });

    return response.json(subject);
  }

  async edit(request: Request, response: Response) {
    const subject = await updateASubjectByIdService({
      schoolId: request.user.school?.id as string,
      newTitle: request.body.newTitle,
      subjectId: request.params.subjectId,
    });

    return response.json(subject);
  }
}

export default new SubjectsController();
