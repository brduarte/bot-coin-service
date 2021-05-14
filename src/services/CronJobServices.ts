import { CronJob } from "cron";
import { getCustomRepository } from "typeorm";
import { JobRepository } from "../repositorys/JobsRepository";
import { ApiPoloniexServices } from "./api/ApiPoloniexServices";

interface ICreateJob {
  frequency: Number;
  currencyPair: String;
}

class CronJobServices {
  static start({ frequency, currencyPair }: ICreateJob): CronJob {
    var job = new CronJob({
      cronTime: `0 ${frequency}/1 * * * *`,
      onTick: () => this.onTick(currencyPair),
      runOnInit: true,
      start: true,
    });

    return job;
  }

  static async toRecoverJobs() {
    const jobRepository = getCustomRepository(JobRepository);
    const jobs = await jobRepository.find({ relations: ["scheduleJob"] });

    if (!jobs.length) {
      return false;
    }

    jobs.forEach((job) => {
      this.start({
        frequency: job.scheduleJob.frequency,
        currencyPair: job.currencyPair,
      });
      console.log("JOB STARTED ==>", job.currencyPair);
    });

    return true;
  }

  static async onTick(currencyPair: any) {
    const apiPoloniexServices = new ApiPoloniexServices();
    const ticker = await apiPoloniexServices.returnTicker();
    console.log(ticker[currencyPair]);
    console.log(`Você esta monitorando esta moeda===>`, currencyPair);
    console.log(new Date());
  }
}

export { CronJobServices };
