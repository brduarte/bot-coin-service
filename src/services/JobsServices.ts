import { getCustomRepository, getManager } from "typeorm";
import { CurrencysRepository } from "../repositorys/CurrencysRepository";
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
  private currencysRepository: CurrencysRepository;

  constructor() {
    this.jobRepository = getCustomRepository(JobRepository);
    this.schedulesJobsRepository = getCustomRepository(SchedulesJobsRepository);
    this.currencysRepository = getCustomRepository(CurrencysRepository);
  }

  async create({ name, currencyPair, frequency }: IJobCreate) {
    const currencyExists = await this.currencysRepository.findOne({
      where: {
        currency_pair: currencyPair,
      },
    });

    if (!currencyExists) {
      throw new Error(
        `Currency pair '${currencyPair}' is not known by the system`
      );
    }

    const jobExists = await this.jobRepository.findJobByCurrencyAndFrequency({
      currencyPair,
      frequency,
    });

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
      currency: currencyExists,
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
