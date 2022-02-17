import { exec } from 'child_process';
import 'dotenv/config';

Object.assign(process.env, {
  DB_HOST: 'localhost',
  DB_PORT: process.env.DB_POINTER_PORT,
  DATABASE: `db_test`,
});

function cmd(command: string) {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(stdout);
    });
  });
}

async function setupDatabaseTest() {
  await cmd(
    `psql ` +
      `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DATABASE} ` +
      `-p ${process.env.DB_PORT} ` +
      `-c "SELECT 1" ` +
      `|| ` +
      `psql ` +
      `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT} ` +
      `-c "CREATE DATABASE ${process.env.DATABASE}"`
  );
  await cmd('yarn typeorm migration:run');
}

export default setupDatabaseTest;
