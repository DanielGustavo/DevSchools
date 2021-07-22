import { Request, Response } from 'express';

import deleteAQuestionService from '../services/deleteAQuestion.service';
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
}

export default new QuestionsController();
