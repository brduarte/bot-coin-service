import { Response, Request } from "express";
import { JobsServices } from "../services/JobsServices";
import { CronJobService } from "../services/CronJobService";

class JobsController {
  static async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, currencyPair, frequency } = request.body;

      const jobsServices = new JobsServices();
      const scheduleJob = await jobsServices.create({
        name: name,
        currencyPair: currencyPair,
        frequency,
      });

      CronJobService.start({
        frequency: scheduleJob.frequency,
        currencyPair: scheduleJob.job.currencyPair,
      });

      return response.json({
        scheduleJob,
        started: true
      });
    } catch (error) {
      return response.json(error);
    }
  }
}

export { JobsController };
