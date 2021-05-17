import "dotenv/config";
import express from "express";
import { connectionDB } from "./database";
import { CronJobServices } from "./services/CronJobServices";

import { routes } from "./routes";

connectionDB()
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(routes);

    app.listen(process.env.APP_PORT, async () => {
      console.log("Server is running on port http://localhost:3333");
      // Essa função recupera os jobs agendados caso ocorra um reinicialização do sistema.
      const cronJobServices = new CronJobServices();
      await cronJobServices.toRecoverJobs();
    });
  })
  .catch(() => {
    console.error("Filid init server");
  });
