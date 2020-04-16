import express from 'express';
import dotenv from 'dotenv';
import * as bodyParser from "body-parser";
import cors from 'cors';

// local imports
import router from "./routes";
import { createTypeormConn } from "./createTypeormConn";
import {createConnection} from "typeorm";
import pg from 'pg';

dotenv.config();
const port = process.env.PORT;

async function startServer() {
  const corsOptions = {
    origin: 'https://dtalk-rest.now.sh',
    optionsSuccessStatus: 200,
  }

  // te

  await createConnection();

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/api', router);

  app.listen(port, () => {
    console.log(`Server is running like 🔥🔥🔥 on port ${port}`);
  });
}

startServer();
