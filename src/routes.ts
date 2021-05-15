import { Router } from "express";
import { SchedulesJobsController } from "./controllers/SchedulesJobsController";

const routes = Router();

routes.post("/jobs", new SchedulesJobsController().create);

export { routes };
