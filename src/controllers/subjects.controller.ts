import { Request, Response } from 'express';

import createSubjectService from '../services/createSubject.service';
import updateASubjectByIdService from '../services/updateASubjectById.service';
import deleteASubjectByIdService from '../services/deleteASubjectById.service';
import insertATeacherInASubjectService from '../services/insertATeacherInASubject.service';
import deleteTeacherFromSubjectService from '../services/deleteTeacherFromSubject.service';

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

  async delete(request: Request, response: Response) {
    const subject = await deleteASubjectByIdService({
      schoolId: request.user.school?.id as string,
      subjectId: request.params.subjectId,
    });

    return response.json(subject);
  }

  async deleteTeacherFromSubject(request: Request, response: Response) {
    const teacher = await deleteTeacherFromSubjectService({
      schoolId: request.user.school?.id as string,
      subjectId: request.params.subjectId,
      personId: request.params.personId,
    });

    const subject = teacher.subjects[0];
    Object.assign(teacher, { subjects: undefined });

    return response.json({ teacher, subject });
  }

  async insertATeacherInASubject(request: Request, response: Response) {
    const { subject, person } = await insertATeacherInASubjectService({
      personId: request.body.personId,
      schoolId: request.user.school?.id as string,
      subjectId: request.params.subjectId,
    });

    Object.assign(subject, { persons: undefined });

    return response.json({ subject, teacher: person });
  }
}

export default new SubjectsController();
