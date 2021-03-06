import { getRepository } from 'typeorm';

import School from '../database/models/School';

import AppError from '../errors/AppError';

import createUserService from './createUser.service';

interface Request {
  email: string;
  name: string;
  password: string;
}

export default async function createSchoolService(
  request: Request
): Promise<School> {
  const schoolRepository = getRepository(School);

  const nameAlreadyExists = !!(await schoolRepository.findOne({
    where: { name: request.name },
  }));

  if (nameAlreadyExists) {
    throw new AppError(400, 'This name already exists, try another one');
  }

  const user = await createUserService({
    ...request,
    isASchool: true,
  });

  const school = schoolRepository.create({
    name: request.name,
    user,
  });
  await schoolRepository.save(school);

  return school;
}
