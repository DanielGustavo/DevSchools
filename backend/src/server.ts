import './database';

import 'express-async-errors';
import 'dotenv/config';
import 'reflect-metadata';
import cors from 'cors';
import express from 'express';

import routes from './routes';

import handleAppErrorThrowMiddleware from './middlewares/handleAppErrorThrow.middleware';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(routes);
app.use(handleAppErrorThrowMiddleware);

app.listen(process.env.APP_PORT, () => {
  console.log(`[Server] Listening at port ${process.env.APP_PORT}`);
});
