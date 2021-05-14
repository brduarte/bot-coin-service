import { CronJob } from "cron";

interface ICreateJob {
  frequency: Number;
  currencyPair: String;
}

class CronJobServices {
  static start({ frequency, currencyPair }: ICreateJob): CronJob {
    var job = new CronJob(
      `0 ${frequency}/1 * * * *`,
      function () {
        console.log(
          `Você esta monitorando esta moeda===>`,
          currencyPair
        );
        console.log(new Date());
        
      },
      null,
      true
    );

    job.start();
    return job;
  }

  static toRecoverJobs() {
   

  }
}

export { CronJobServices };
