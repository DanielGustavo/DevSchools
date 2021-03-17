import 'dotenv/config';

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  migrations: ['./src/database/migrations/*.ts'],
  entities: ['./src/database/models/*.ts'],
  cli: {
    entitiesDir: './src/database/models',
    migrationsDir: './src/database/migrations',
  },
};
