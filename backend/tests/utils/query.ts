import { getConnection } from 'typeorm';

export default async function query(rawSql: string, params?: Array<unknown>) {
  return getConnection().createEntityManager().query(rawSql, params);
}
