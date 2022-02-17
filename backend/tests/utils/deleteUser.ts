import { query } from './index';

export default async function deleteUser(userId: string) {
  await query('DELETE FROM users WHERE id = $1', [userId]);
}
