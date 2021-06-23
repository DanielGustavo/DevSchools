import { Request, Response } from 'express';

import createSchoolService from '../services/createSchool.service';
import getClassroomsBySchoolIdService from '../services/getClassroomsBySchoolId.service';
import getStudentsBySchoolIdService from '../services/getStudentsBySchoolId.service';
import getSubjectsBySchoolIdService from '../services/getSubjectsBySchoolId.service';
import getTeachersBySchoolIdService from '../services/getTeachersBySchoolId.service';

class SchoolsController {
  async store(request: Request, response: Response) {
    const school = await createSchoolService(request.body);

    Object.assign(school.user, { password: undefined, id: undefined });
    return response.json(school);
  }

  async getClassroomsOfTheAuthenticatedSchool(
    request: Request,
    response: Response
  ) {
    const { school, person } = request.user;
    const schoolId = (school?.id || person?.schoolId) as string;

    const classrooms = await getClassroomsBySchoolIdService({
      schoolId,
      page: parseInt(request.params.page, 10),
    });

    return response.json(classrooms);
  }

  async getStudentsOfTheAuthenticatedSchool(
    request: Request,
    response: Response
  ) {
    const students = await getStudentsBySchoolIdService({
      schoolId: request.user.school?.id as string,
      page: parseInt(request.params.page, 10),
    });

    return response.json(students);
  }

  async getTeachersOfTheAuthenticatedSchool(
    request: Request,
    response: Response
  ) {
    const teachers = await getTeachersBySchoolIdService({
      schoolId: request.user.school?.id as string,
      page: parseInt(request.params.page, 10),
    });

    return response.json(teachers);
  }

  async getSubjectsOfTheAuthenticatedSchool(
    request: Request,
    response: Response
  ) {
    const { school, person } = request.user;
    const schoolId = (school?.id || person?.schoolId) as string;

    const subjects = await getSubjectsBySchoolIdService({
      schoolId,
      page: parseInt(request.params.page, 10),
    });

    return response.json(subjects);
  }
}

export default new SchoolsController();
