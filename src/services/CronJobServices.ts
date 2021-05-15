import { CronJob } from "cron";
import { getCustomRepository } from "typeorm";
import { Job } from "../database/entities/Job";
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

  start(job: Job): CronJob {
    var cronJob = new CronJob({
      cronTime: `0 ${job.scheduleJob.frequency}/1 * * * *`,
      onTick: () => this.onTick(job),
      runOnInit: true,
      start: true,
    });

    return cronJob;
  }

  async toRecoverJobs() {
    const jobs = await this.jobRepository.find({ relations: ["scheduleJob"] });

    if (!jobs.length) {
      return false;
    }

    jobs.forEach((job) => {
      this.start(job);
      console.log("JOB STARTED ==>", job.currencyPair);
    });

    return true;
  }

  async onTick(job: Job) {
    const apiPoloniexServices = new ApiPoloniexServices();
    const ticker = await apiPoloniexServices.returnTicker();
    console.log(ticker[job.currencyPair]);
    console.log(`Você esta monitorando essa moeda===>`, job.currencyPair);
    console.log(new Date());
  }
}

export { CronJobServices };
