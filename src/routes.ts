import { Router } from "express";
import { SchedulesJobsController } from "./controllers/SchedulesJobsController";

const routes = Router();

const schedulesJobsController = new SchedulesJobsController()

routes.post("/jobs", schedulesJobsController.create);

export { routes };
