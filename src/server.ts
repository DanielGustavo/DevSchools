import './database';

import 'express-async-errors';
import 'dotenv/config';
import 'reflect-metadata';
import express, { Request, Response } from 'express';

import handleAppErrorThrow from './middlewares/handleAppErrorThrow';

const app = express();

app.use(express.json());

app.get('/', (request: Request, response: Response) => {
  response.json({ ok: true });
});

app.use(handleAppErrorThrow);

app.listen(process.env.APP_PORT, () => {
  console.log(`[Server] Listening at port ${process.env.APP_PORT}`);
});
