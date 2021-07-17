import { Request, Response } from 'express';

import deleteAQuestionService from '../services/deleteAQuestion.service';

class QuestionsController {
  async delete(request: Request, response: Response) {
    const question = await deleteAQuestionService({
      questionId: request.params.questionId,
      teacherId: request.user.person?.id as string,
    });

    return response.json(question);
  }
}

export default new QuestionsController();
