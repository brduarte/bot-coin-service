import { Router } from "express";
import { SchedulesJobsController } from "./controllers/SchedulesJobsController";
import { CandlesController } from "./controllers/CandlesController";

const routes = Router();

routes.get("/", (request, response) => {
    return response.json({
        version: '1.0',
        description: 'Bot Coin Service' 
    })
});

routes.post("/jobs", new SchedulesJobsController().create);
routes.get("/candles", new CandlesController().getCandles);

export { routes };
