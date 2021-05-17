import { CronJob } from "cron";
import { getCustomRepository } from "typeorm";
import { Job } from "../database/entities/Job";
import { CandlesRepository } from "../repositorys/CandlesRepository";
import { JobRepository } from "../repositorys/JobsRepository";
import { ApiPoloniexServices } from "./api/ApiPoloniexServices";

class CronJobServices {
  private jobRepository: JobRepository;
  private candlesRepository: CandlesRepository;

  constructor() {
    this.jobRepository = getCustomRepository(JobRepository);
    this.candlesRepository = getCustomRepository(CandlesRepository);
  }

  start(job: Job): CronJob {
    var cronJob = new CronJob({
      cronTime: `0 0/${job.scheduleJob.frequency} * * * *`,
      onTick: () => this.onTick(job),
      runOnInit: false,
      start: true,
      timeZone: "America/Sao_Paulo",
    });

    return cronJob;
  }

  async toRecoverJobs() {
    const jobs = await this.jobRepository.find({
      relations: ["scheduleJob", "currency"],
    });

    if (!jobs.length) {
      return false;
    }

    jobs.forEach((job) => {
      this.start(job);
      console.log(
        `JOB RESTARTED FREQUENCY ${job.scheduleJob.frequency}  ==>`,
        job.currency.currency_pair
      );
    });

    return true;
  }

  private async onTick(job: Job) {
    const apiPoloniexServices = new ApiPoloniexServices();

    const ticker = await apiPoloniexServices.returnTicker();

    let candles = this.candlesRepository.create({
      job,
      open: ticker[job.currency.currency_pair].last,
      low: ticker[job.currency.currency_pair].lowestAsk,
      high: ticker[job.currency.currency_pair].highestBid,
      close: ticker[job.currency.currency_pair].last,
    });

    await this.candlesRepository.save(candles);

    console.log(
      `Moeda monitorada ===> ${job.currency.currency_pair} - FREQUENCY ${job.scheduleJob.frequency} - JOB NAME ${job.name}`
    );

    return true;
  }

}

export { CronJobServices };
