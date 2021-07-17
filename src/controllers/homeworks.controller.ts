import { Request, Response } from 'express';

import createHomeworkService from '../services/createHomework.service';
import createQuestionService from '../services/createQuestion.service';
import deleteAHomeworkService from '../services/deleteAHomework.service';
import updateAHomeworkService from '../services/updateAHomework.service';

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

  async edit(request: Request, response: Response) {
    const { classroomId, deadline, description, subjectId, title } =
      request.body;

    const homework = await updateAHomeworkService({
      classroomId,
      deadline: parseInt(deadline, 10),
      homeworkId: request.params.homeworkId,
      description,
      subjectId,
      teacherId: request.user.person?.id as string,
      title,
    });

    return response.json(homework);
  }

  async addQuestion(request: Request, response: Response) {
    const { alternatives, questionTitle } = request.body;

    const question = await createQuestionService({
      alternatives,
      homeworkId: request.params.homeworkId,
      questionTitle,
      teacherId: request.user.person?.id as string,
    });

    return response.json(question);
  }
}

export default new HomeworksController();
