import { Request, Response } from 'express';

import createClassroomService from '../services/createClassroom.service';
import deleteAClassroomByIdService from '../services/deleteAClassroomById.service';
import getPersonsByClassroomIdService from '../services/getPersonsByClassroomId.service';
import insertAPersonInAClassroomService from '../services/insertAPersonInAClassroom.service';
import updateAClassroomByIdService from '../services/updateAClassroomById.service';
import insertASubjectInAClassroomService from '../services/insertASubjectInAClassroom.service';
import getSubjectsByClassroomIdService from '../services/getSubjectsByClassroomId.service';
import getClassroomByIdService from '../services/getClassroomById.service';
import deletePersonFromClassroomService from '../services/deletePersonFromClassroom.service';
import deleteSubjectFromClassroomService from '../services/deleteSubjectFromClassroom.service';

class ClassroomsController {
  async listClassroom(request: Request, response: Response) {
    const { school, person } = request.user;
    const schoolId = (school?.id || person?.schoolId) as string;

    const classroom = await getClassroomByIdService({
      schoolId,
      classroomId: request.params.classroomId,
    });

    return response.json(classroom);
  }

  async store(request: Request, response: Response) {
    const { title } = request.body;

    const classroom = await createClassroomService({
      title,
      schoolId: request.user.school?.id as string,
    });

    return response.json(classroom);
  }

  async delete(request: Request, response: Response) {
    const { classroomId } = request.params;

    const classroom = await deleteAClassroomByIdService({
      classroomId,
      schoolId: request.user.school?.id as string,
    });

    const message = `${classroom.title} was delete successfully`;
    return response.json({ message });
  }

  async deletePersonFromClassroom(request: Request, response: Response) {
    const person = await deletePersonFromClassroomService({
      schoolId: request.user.school?.id as string,
      classroomId: request.params.classroomId,
      personId: request.params.personId,
    });

    const classroom = person.classrooms[0];
    Object.assign(person, { classrooms: undefined });

    return response.json({ person, classroom });
  }

  async deleteSubjectFromClassroom(request: Request, response: Response) {
    const subject = await deleteSubjectFromClassroomService({
      schoolId: request.user.school?.id as string,
      classroomId: request.params.classroomId,
      subjectId: request.params.subjectId,
    });

    const classroom = subject.classrooms[0];
    Object.assign(subject, { classrooms: undefined });

    return response.json({ subject, classroom });
  }

  async edit(request: Request, response: Response) {
    const { classroomId } = request.params;

    const classroom = await updateAClassroomByIdService({
      classroomId,
      newTitle: request.body.newTitle,
      schoolId: request.user.school?.id as string,
    });

    return response.json(classroom);
  }

  async insertAPersonInAClassroom(request: Request, response: Response) {
    const { classroomId } = request.params;
    const { personId } = request.body;

    const { person, classroom } = await insertAPersonInAClassroomService({
      classroomId,
      schoolId: request.user.school?.id as string,
      personId,
    });

    Object.assign(person, { classrooms: undefined });

    return response.json({
      person,
      classroom,
    });
  }

  async listPersonsRegisteredInAClassroom(
    request: Request,
    response: Response
  ) {
    const { classroomId } = request.params;

    const persons = await getPersonsByClassroomIdService({
      classroomId,
      schoolId: request.user.school?.id as string,
    });

    return response.json(persons);
  }

  async insertASubjectInAClassroom(request: Request, response: Response) {
    const { subject, classroom } = await insertASubjectInAClassroomService({
      schoolId: request.user.school?.id as string,
      classroomId: request.params.classroomId,
      subjectId: request.body.subjectId,
    });

    return response.json({ subject, classroom });
  }

  async listSubjectsInsertedInAClassroom(request: Request, response: Response) {
    const { school, person } = request.user;
    const schoolId = (school?.id || person?.schoolId) as string;

    const subjects = await getSubjectsByClassroomIdService({
      classroomId: request.params.classroomId,
      schoolId,
    });

    return response.json(subjects);
  }
}

export default new ClassroomsController();
