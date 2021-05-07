import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';
import { resolve } from 'path';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: (process.env.DB_PORT || 5432) as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  migrations: [resolve(__dirname, 'migrations', '**', '*.ts')],
  entities: [resolve(__dirname, 'models', '**', '*.ts')],
  cli: {
    entitiesDir: resolve(__dirname, 'models'),
    migrationsDir: resolve(__dirname, 'migrations'),
  },
};

export default config;
