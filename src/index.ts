import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import { errorHandler } from './middleware/errorHandler';

dotenv.config({path: __dirname + '/.env'});
const app = express();
const port = process.env.PORT || 3000;
const apiPrefix = process.env.API_PREFIX || '/api/v1';

app.use(cors());

app.use(bodyParser.json());


app.use(errorHandler);

app.listen(port, () => {
  console.log(`API server is running at http://localhost:${port}`);
});

export default app;