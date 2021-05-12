import { Router } from "express";
import { JobsController } from "./controllers/JobsController";

const routes = Router();

routes.post("/jobs", JobsController.create);

export { routes };
