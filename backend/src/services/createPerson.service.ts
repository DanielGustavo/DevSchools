import { getRepository } from 'typeorm';
import { base64encode } from 'nodejs-base64';

import Person from '../database/models/Person';
import School from '../database/models/School';

import createUserService from './createUser.service';

import AppError from '../errors/AppError';

import generateRandomString from '../utils/generateRandomString';
import createTokenToAUserOfTypePerson from '../utils/createTokenToAUserOfTypePerson';

import nodemailerProvider from '../providers/MailerProvider/NodemailerProvider';
import MailerProvider from '../providers/MailerProvider/MailerProviderInterfaces';

interface Request {
  personDatas: {
    email: string;
    role: string;
    name: string;
  };
  schoolId: string;
}

export default async function createPersonService(
  request: Request,
  mailerProvider: MailerProvider = nodemailerProvider
): Promise<Person> {
  const { personDatas, schoolId } = request;

  const schoolRepository = getRepository(School);
  const school = await schoolRepository.findOne(schoolId);

  if (!school) {
    throw new AppError(400, 'This school does not exist');
  }

  const user = await createUserService({
    email: personDatas.email,
    password: generateRandomString(18),
    isASchool: false,
  });

  const personRepository = getRepository(Person);

  const person = personRepository.create({
    role: personDatas.role,
    name: personDatas.name,
    school,
    user,
  });

  await personRepository.save(person);

  const token = createTokenToAUserOfTypePerson({ person, user });
  const tokenBase64Encoded = base64encode(token);

  const accessLink = `${process.env.APP_URL}/?token=${tokenBase64Encoded}`;

  await mailerProvider.send({
    subject: 'Account created successfully!',
    to: personDatas.email,
    template: {
      filename: 'signUpEmail.hbs',
      values: {
        name: person.name,
        schoolName: school.name,
        personRole: person.role,
        accessLink,
      },
    },
    attachmentsFilenames: ['wave.svg', 'devschoolsLogo.svg'],
  });

  return person;
}
