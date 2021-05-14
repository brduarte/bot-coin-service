import { EntityRepository, Repository, Transaction } from "typeorm";
import { Job } from "../database/entities/Job";

@EntityRepository(Job)
class JobRepository extends Repository<Job> {
  async findJobByCurrencyAndFrequency({ currencyPair, frequency }) {
    try {
      const jobSchedule = await this.createQueryBuilder("job")
        .leftJoinAndSelect("job.scheduleJob", "scheduleJob")
        .where("job.currencyPair=:currencyPair", { currencyPair })
        .andWhere("frequency=:frequency", { frequency })
        .getOne();

      return jobSchedule;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export { JobRepository };
