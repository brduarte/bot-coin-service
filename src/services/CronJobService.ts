import { CronJob } from "cron";

interface ICreateJob {
  frequency: Number;
  currencyPair: String;
}

class CronJobService {
  static start({ frequency, currencyPair }: ICreateJob): CronJob {
    var job = new CronJob(
      `0 ${frequency}/1 * * * *`,
      function () {
        console.log("You will see this message every second ====>", currencyPair);
      },
      null,
      true
    );
    job.start();

    return job
  }
}

export { CronJobService };
