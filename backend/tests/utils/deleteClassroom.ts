import { query } from './index';

export default function deleteClassroom(classroomId: string) {
  return query('DELETE FROM classrooms WHERE id = $1', [classroomId]);
}
