import getSchoolByUserId from '../utils/getSchoolByUserId';

interface Request {
  userId: string;
}

export default async function getStudentsByUserIdOfASchoolService(
  request: Request
) {
  const school = await getSchoolByUserId(request.userId);

  const students = (await school.persons).filter(
    (person) => person.role === 'student'
  );

  return students;
}
