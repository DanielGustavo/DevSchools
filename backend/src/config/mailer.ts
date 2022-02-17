import 'dotenv/config';
import { resolve } from 'path';

export default {
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD,
  },
  from: process.env.MAILER_FROM,
  templatesDir: resolve(__dirname, '..', 'resources', 'views', 'emails'),
  attachmentsDir: resolve(__dirname, '..', 'resources', 'images'),
};
