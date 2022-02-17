import { query } from './index';

export default function deleteSubject(subjectId: string) {
  return query('DELETE FROM subjects WHERE id = $1', [subjectId]);
}
