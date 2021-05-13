import { Router } from "express";
import { SchedulesJobsController } from "./controllers/SchedulesJobsController";

const routes = Router();

routes.post("/jobs", SchedulesJobsController.create);

export { routes };
