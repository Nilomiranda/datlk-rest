import express from 'express';
import dotenv from 'dotenv';
import * as bodyParser from "body-parser";

// local imports
import router from "./routes";
import { createTypeormConn } from "./createTypeormConn";
import {createConnection} from "typeorm";

dotenv.config();
const port = process.env.PORT;

async function startServer() {
  await createConnection();
  const app = express();
  app.use(bodyParser.json());
  app.use('/', router);

  app.listen(port, () => {
    console.log(`Server is running like 🔥🔥🔥 on port ${port}`);
  });
}

startServer();
