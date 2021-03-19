import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: (process.env.DB_PORT || 5432) as number,
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

export default config;
