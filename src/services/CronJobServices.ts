import { CronJob, job } from "cron";
import { getCustomRepository } from "typeorm";
import { JobRepository } from "../repositorys/JobsRepository";

interface ICreateJob {
  frequency: Number;
  currencyPair: String;
}

class CronJobServices {
  static start({ frequency, currencyPair }: ICreateJob): CronJob {
    var job = new CronJob(
      `0 ${frequency}/1 * * * *`,
      function () {
        console.log(`Você esta monitorando esta moeda===>`, currencyPair);
        console.log(new Date());
      },
      null,
      true
    );

    job.start();
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
      console.log('JOB STARTED ==>', job.currencyPair);
    });

    return true;
  }
}

export { CronJobServices };
