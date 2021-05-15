import { Response, Request } from "express";
import { JobsServices } from "../services/JobsServices";
import { CronJobServices } from "../services/CronJobServices";

class SchedulesJobsController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const cronJobServices = new CronJobServices();
      const { name, currencyPair, frequency } = request.body;

      const jobsServices = new JobsServices();
      const job = await jobsServices.create({
        name,
        currencyPair,
        frequency,
      });

      cronJobServices.start(job);

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
