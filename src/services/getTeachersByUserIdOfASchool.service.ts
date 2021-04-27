import getSchoolByUserId from '../utils/getSchoolByUserId';

interface Request {
  userId: string;
}

export default async function getTeachersByUserIdOfASchoolService(
  request: Request
) {
  const school = await getSchoolByUserId(request.userId);

  const teachers = (await school.persons).filter(
    (person) => person.role === 'teacher'
  );

  return teachers;
}
