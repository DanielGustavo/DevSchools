import { Request, Response } from 'express';

import createSchoolService from '../services/createSchool.service';
import getClassroomsBySchoolIdService from '../services/getClassroomsBySchoolId.service';
import getStudentsBySchoolIdService from '../services/getStudentsBySchoolId.service';
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
    const classrooms = await getClassroomsBySchoolIdService(
      request.user.school?.id as string
    );

    return response.json(classrooms);
  }

  async getStudentsOfTheAuthenticatedSchool(
    request: Request,
    response: Response
  ) {
    const students = await getStudentsBySchoolIdService(
      request.user.school?.id as string
    );

    return response.json(students);
  }

  async getTeachersOfTheAuthenticatedSchool(
    request: Request,
    response: Response
  ) {
    const teachers = await getTeachersBySchoolIdService(
      request.user.school?.id as string
    );

    return response.json(teachers);
  }
}

export default new SchoolsController();
