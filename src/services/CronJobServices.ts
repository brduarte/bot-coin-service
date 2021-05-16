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
      timeZone: 'America/Sao_Paulo'
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

  private async onTick(job: Job) {
    const apiPoloniexServices = new ApiPoloniexServices();
    const ticker = await apiPoloniexServices.returnTicker();

    const candles = await this.candlesRepository.create({
      job: job,
      open: ticker[job.currencyPair].last,
      low: ticker[job.currencyPair].lowestAsk,
      high: ticker[job.currencyPair].highestBid,
      close: ticker[job.currencyPair].last,
    });

    await this.candlesRepository.save(candles);

    console.log(
      `Você esta monitorando essa moeda===> ${new Date()} - ${job.scheduleJob.frequency}`,
      job.currencyPair
    );
  }
}

export { CronJobServices };
