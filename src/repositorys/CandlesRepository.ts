import { EntityRepository, Repository } from "typeorm";
import { Candles } from "../database/entities/Candles";

@EntityRepository(Candles)
class CandlesRepository extends Repository<Candles> {
  async getCandlesByCurrencyAndFrequency({ currencyPair, frequency }) {
    try {
      const candles = await this.createQueryBuilder("candles")
        .innerJoin("candles.job", "job")
        .leftJoinAndSelect("job.scheduleJob", "scheduleJob")
        .innerJoin("job.currency", "currency")
        .where("currency.currency_pair=:currencyPair", { currencyPair })
        .andWhere("frequency=:frequency", { frequency })
        .orderBy("candles.created_at", "DESC")
        .getMany();

      return candles;
    } catch (error) {
      console.log(error);

      throw new Error(error);
    }
  }
}

export { CandlesRepository };
