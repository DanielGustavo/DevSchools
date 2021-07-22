import { getRepository } from 'typeorm';

import Alternative from '../database/models/Alternative';
import Question from '../database/models/Question';

import AppError from '../errors/AppError';

interface AlternativeRequest {
  id?: string;
  text?: string;
  correct?: boolean;
  deleted?: boolean;
}

interface Request {
  teacherId: string;
  questionId: string;
  questionTitle?: string;
  alternatives?: AlternativeRequest[];
}

export default async function updateAQuestionService(request: Request) {
  const { alternatives, teacherId, questionId, questionTitle } = request;

  const questionRepository = getRepository(Question);
  const alternativeRepository = getRepository(Alternative);

  const question = await questionRepository.findOne(questionId, {
    relations: ['homework', 'alternatives'],
  });

  const alternativesQuantity = question?.alternatives.length || 0;

  const deletedAlternativesQuantity =
    alternatives?.filter((alternative) => alternative.deleted && alternative.id)
      .length || 0;

  const toAddAlternativesQuantity =
    alternatives?.filter((alternative) => alternative.id === undefined)
      .length || 0;

  const totalAlternativesQuantity =
    alternativesQuantity -
    deletedAlternativesQuantity +
    toAddAlternativesQuantity;

  if (!question) {
    throw new AppError(404, 'This question does not exist.');
  }

  const teacherOwnsQuestion = question.homework.person_id === teacherId;

  if (!teacherOwnsQuestion) {
    throw new AppError(403, 'You do not own this question.');
  }

  if (totalAlternativesQuantity < 2) {
    throw new AppError(403, 'A question must have at least 2 alternatives.');
  }

  if (totalAlternativesQuantity > 5 && toAddAlternativesQuantity > 0) {
    throw new AppError(
      403,
      'A question can not have more than 5 alternatives.'
    );
  }

  const correctAlternatives =
    alternatives?.filter((alternative) => alternative.correct === true) || [];

  if (correctAlternatives.length > 1) {
    throw new AppError(
      403,
      'A question must have only one correct alternative.'
    );
  }

  const correctAlternative = correctAlternatives[0];

  if (correctAlternative && correctAlternative.deleted === true) {
    throw new AppError(
      403,
      'A deleted alternative can not be the correct one.'
    );
  }

  if (questionTitle) {
    question.question = questionTitle;
  }

  const alternativesWithIdPromises = alternatives
    ?.filter((alternative) => alternative.id !== undefined)
    .map(async (alternative) => {
      const alternativeEntity = await alternativeRepository.findOne(
        alternative.id,
        {
          where: {
            id: alternative.id,
            question,
          },
        }
      );

      if (!alternativeEntity) {
        throw new AppError(
          403,
          'All alternatives passed with id must exist in this question.'
        );
      }

      const alternativeIndex = question.alternatives.findIndex(
        (currentAlternative) => currentAlternative.id === alternativeEntity.id
      );

      if (alternative.deleted) {
        const thisAlternativeIsTheCorrectOne =
          question.alternatives[alternativeIndex].id ===
          question.correct_alternative_id;

        if (
          thisAlternativeIsTheCorrectOne &&
          correctAlternatives.length === 0
        ) {
          throw new AppError(
            403,
            'You are deleting a correct alternative, so you should select another alternative to be the correct one'
          );
        }

        await alternativeRepository.delete(alternative.id as string);
        question.alternatives.splice(alternativeIndex, 1);

        return;
      }

      if (alternative.correct && alternative.id) {
        question.correct_alternative_id = alternative.id;
      }

      alternativeEntity.text = alternative.text || alternativeEntity.text;
      await alternativeRepository.save(alternativeEntity);

      question.alternatives[alternativeIndex] = alternativeEntity;
    });

  if (alternativesWithIdPromises) {
    await Promise.all(alternativesWithIdPromises);
  }

  const alternativesWithoutIdPromises = alternatives
    ?.filter((alternative) => alternative.id === undefined)
    .map(async (alternative) => {
      const alternativeEntity = alternativeRepository.create({
        text: alternative.text,
        question_id: question.id,
      });

      await alternativeRepository.save(alternativeEntity);
      question.alternatives.push(alternativeEntity);

      if (alternative.correct) {
        question.correct_alternative_id = alternativeEntity.id;
      }
    });

  if (alternativesWithoutIdPromises) {
    await Promise.all(alternativesWithoutIdPromises);
  }

  await questionRepository.save(question);
  return question;
}
