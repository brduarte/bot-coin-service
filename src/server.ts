import express from "express";
import { routes } from "./routes";
import { createConnection } from "./database";
import { CronJobServices } from "./services/CronJobServices";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, async () => {
  console.log("Server is running on port http://localhost:3333");
  await createConnection();
  // Essa função recupera os jobs agendados caso ocorra um reinicialização do sistema.
  await CronJobServices.toRecoverJobs();
});
