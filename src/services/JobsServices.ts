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

  async create({ name, currencyPair, frequency }: IJobCreate)  {
    const job = this.jobRepository.create({
      name,
      currencyPair,
    });

    const scheduleJob = this.schedulesJobsRepository.create({
      frequency,
      job,
    });

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(job);
      await transactionalEntityManager.save(scheduleJob);
    });

    return scheduleJob;
  }
}

export { JobsServices };
