import { Request, Response } from 'express';

import deleteAQuestionService from '../services/deleteAQuestion.service';
import getQuestionByIdService from '../services/getQuestionById.service';
import updateAQuestionService from '../services/updateAQuestion.service';

class QuestionsController {
  async delete(request: Request, response: Response) {
    const question = await deleteAQuestionService({
      questionId: request.params.questionId,
      teacherId: request.user.person?.id as string,
    });

    return response.json(question);
  }

  async edit(request: Request, response: Response) {
    const { alternatives, questionTitle } = request.body;

    const question = await updateAQuestionService({
      alternatives,
      questionTitle,
      questionId: request.params.questionId,
      teacherId: request.user.person?.id as string,
    });

    Object.assign(question, { homework: undefined });

    return response.json(question);
  }

  async listQuestion(request: Request, response: Response) {
    const { questionId } = request.params;

    const { school, person } = request.user;
    const schoolId = (school?.id || person?.schoolId) as string;

    const question = await getQuestionByIdService({
      questionId,
      schoolId,
      person,
    });

    return response.json(question);
  }
}

export default new QuestionsController();
