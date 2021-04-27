import { Request, Response } from 'express';

import createSchoolService from '../services/createSchool.service';
import getClassroomsBySchoolNameService from '../services/getClassroomsBySchoolName.service';
import getStudentsByUserIdOfASchoolService from '../services/getStudentsByUserIdOfASchool.service';

class SchoolsController {
  async store(request: Request, response: Response) {
    const school = await createSchoolService(request.body);

    Object.assign(school.user, { password: undefined, id: undefined });
    return response.json(school);
  }

  async getClassroomsOfASchool(request: Request, response: Response) {
    const classrooms = await getClassroomsBySchoolNameService({
      schoolName: request.params.schoolName,
      userDatas: request.user,
    });

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
}

export default new SchoolsController();
