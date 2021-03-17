import './database';

import express, { Request, Response } from 'express';
import 'dotenv/config';
import 'reflect-metadata';

const app = express();

app.use(express.json());

app.get('/', (request: Request, response: Response) => {
  response.json({ ok: true });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`[Server] Listening at port ${process.env.APP_PORT}`);
});
