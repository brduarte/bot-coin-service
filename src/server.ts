import 'dotenv/config';
import './database';

import express from "express";
import { routes } from "./routes";
import { CronJobServices } from "./services/CronJobServices";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, async () => {
  console.log("Server is running on port http://localhost:3333");
  // Essa função recupera os jobs agendados caso ocorra um reinicialização do sistema.
  const cronJobServices = new CronJobServices();
  await cronJobServices.toRecoverJobs();
});
