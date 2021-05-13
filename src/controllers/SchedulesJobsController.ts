import { Response, Request } from "express";
import { SchedulesJobsService } from "../services/SchedulesJobsService";
import { CronJobService } from "../services/CronJobService";

class SchedulesJobsController {
  static async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, currencyPair, frequency } = request.body;

      const jobsServices = new SchedulesJobsService();
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

export { SchedulesJobsController };
