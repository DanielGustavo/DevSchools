import 'dotenv/config';

Object.assign(process.env, {
  DB_HOST: 'localhost',
  DB_PORT: process.env.DB_POINTER_PORT,
});
