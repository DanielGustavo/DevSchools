import { Request, Response } from 'express';

import createSchoolService from '../services/createSchool.service';
import getClassroomsByUserIdOfASchool from '../services/getClassroomsByUserIdOfASchool.service';
import getStudentsByUserIdOfASchoolService from '../services/getStudentsByUserIdOfASchool.service';
import getTeachersByUserIdOfASchoolService from '../services/getTeachersByUserIdOfASchool.service';

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
    const classrooms = await getClassroomsByUserIdOfASchool(request.user.id);

    return response.json(classrooms);
  }

  async getStudentsOfTheAuthenticatedSchool(
    request: Request,
    response: Response
  ) {
    const students = await getStudentsByUserIdOfASchoolService({
      userId: request.user.id,
    });

    return response.json(students);
  }

  async getTeachersOfTheAuthenticatedSchool(
    request: Request,
    response: Response
  ) {
    const teachers = await getTeachersByUserIdOfASchoolService({
      userId: request.user.id,
    });

    return response.json(teachers);
  }
}

export default new SchoolsController();
