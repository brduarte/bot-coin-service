import { Router } from "express";
import { SchedulesJobsController } from "./controllers/SchedulesJobsController";

class Routers {
  static routes = Router();

  static getRouter() {
    this.routes.post("/jobs", new SchedulesJobsController().create);
  }
}

export { Routers };
