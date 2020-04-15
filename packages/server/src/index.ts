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
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  }

  // testing

  await createConnection();

  const app = express();
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use('/api', router);

  app.listen(port, () => {
    console.log(`Server is running like 🔥🔥🔥 on port ${port}`);
  });
}

startServer();
