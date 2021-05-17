import { Router } from "express";
import { SchedulesJobsController } from "./controllers/SchedulesJobsController";
import { CandlesController } from "./controllers/CandlesController";



const routes = Router();

routes.post("/jobs", new SchedulesJobsController().create);
routes.get("/candles", new CandlesController().getCandles)

export { routes };
