import { CronJob } from "cron";
import { getCustomRepository } from "typeorm";
import { JobRepository } from "../repositorys/JobsRepository";
import { ApiPoloniexServices } from "./api/ApiPoloniexServices";

interface ICreateJob {
  frequency: Number;
  currencyPair: String;
}

class CronJobServices {
  private jobRepository: JobRepository;

  constructor() {
    this.jobRepository = getCustomRepository(JobRepository);
  }

  start({ frequency, currencyPair }: ICreateJob): CronJob {
    var job = new CronJob({
      cronTime: `0 ${frequency}/1 * * * *`,
      onTick: () => this.onTick(currencyPair),
      runOnInit: true,
      start: true,
    });

    return job;
  }

  async toRecoverJobs() {
    const jobs = await this.jobRepository.find({ relations: ["scheduleJob"] });

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

  async onTick(currencyPair: any) {
    const apiPoloniexServices = new ApiPoloniexServices();
    const ticker = await apiPoloniexServices.returnTicker();
    console.log(ticker[currencyPair]);
    console.log(`Você esta monitorando essa moeda===>`, currencyPair);
    console.log(new Date());
  }
}

export { CronJobServices };
