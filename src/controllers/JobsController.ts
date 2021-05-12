import { Response, Request } from "express";
import { JobsServices } from "../services/JobsServices";

class JobsController {
  static async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, currencyPair, frequency } = request.body;

      const jobsServices = new JobsServices();
      const user = await jobsServices.create({
        name: name,
        currencyPair: currencyPair,
        frequency,
      });

      return response.json(user);
    } catch (error) {
      return response.json(error);
    }
  }
}

export { JobsController };
