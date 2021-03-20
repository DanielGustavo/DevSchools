import './database';

import 'express-async-errors';
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';

import routes from './routes';

import handleAppErrorThrow from './middlewares/handleAppErrorThrow';

const app = express();

app.use(express.json());
app.use(routes);
app.use(handleAppErrorThrow);

app.listen(process.env.APP_PORT, () => {
  console.log(`[Server] Listening at port ${process.env.APP_PORT}`);
});
