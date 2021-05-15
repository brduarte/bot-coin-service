import { Response, Request } from "express";
import { JobsServices } from "../services/JobsServices";
import { CronJobServices } from "../services/CronJobServices";

class SchedulesJobsController {
  private cronJobServices: CronJobServices;

  constructor() {
    this.cronJobServices = new CronJobServices();
  }

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, currencyPair, frequency } = request.body;

      const jobsServices = new JobsServices();
      const job = await jobsServices.create({
        name,
        currencyPair,
        frequency,
      });

      this.cronJobServices.start(job);

      return response.json({
        job,
        started: true,
      });
    } catch (error) {
      return response
        .json({
          message: error.message,
        })
        .status(500);
    }
  }
}

export { SchedulesJobsController };
