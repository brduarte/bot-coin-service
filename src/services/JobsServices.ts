import { getCustomRepository, getManager } from "typeorm";
import { JobRepository } from "../repositorys/JobsRepository";
import { SchedulesJobsRepository } from "../repositorys/SchedulesJobsRepository";

interface IJobCreate {
  name: string;
  currencyPair: string;
  frequency: number;
}

class JobsServices {
  private jobRepository: JobRepository;
  private schedulesJobsRepository: SchedulesJobsRepository;

  constructor() {
    this.jobRepository = getCustomRepository(JobRepository);
    this.schedulesJobsRepository = getCustomRepository(SchedulesJobsRepository);
  }

  async create({ name, currencyPair, frequency }: IJobCreate) {
    const jobExists = await this.jobRepository.findJobByCurrencyAndFrequency({currencyPair,frequency})

    if (jobExists) {
      throw new Error(
        "An appointment with this period already exists for that currency"
      );
    }

    const scheduleJob = this.schedulesJobsRepository.create({
      frequency,
    });

    const job = this.jobRepository.create({
      name,
      currencyPair,
      scheduleJob,
    });

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(scheduleJob);
      await transactionalEntityManager.save(job);
    });

    return job;
  }
}

export { JobsServices };
