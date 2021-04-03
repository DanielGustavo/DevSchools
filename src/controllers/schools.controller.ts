import { Request, Response } from 'express';

import createSchoolService from '../services/createSchool.service';
import getClassroomsBySchoolNameService from '../services/getClassroomsBySchoolName.service';

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
}

export default new SchoolsController();
