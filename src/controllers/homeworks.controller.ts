import { Request, Response } from 'express';

import createHomeworkService from '../services/createHomework.service';
import deleteAHomeworkService from '../services/deleteAHomework.service';

class HomeworksController {
  async store(request: Request, response: Response) {
    const { title, description, deadline, classroomId, subjectId } =
      request.body;

    const homework = await createHomeworkService({
      title,
      description,
      deadline: parseInt(deadline, 10),
      classroomId,
      subjectId,
      teacherId: request.user.person?.id as string,
    });

    Object.assign(homework.person, {
      classrooms: undefined,
      subjects: undefined,
    });

    return response.json(homework);
  }

  async delete(request: Request, response: Response) {
    const homework = await deleteAHomeworkService({
      homeworkId: request.params.homeworkId,
      teacherId: request.user.person?.id as string,
    });

    return response.json(homework);
  }
}

export default new HomeworksController();