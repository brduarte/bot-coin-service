import { getCustomRepository } from "typeorm";
import { CandlesRepository } from "../repositorys/CandlesRepository";

class CandlesServices {
  private candlesRepository: CandlesRepository;

  constructor() {
    this.candlesRepository = getCustomRepository(CandlesRepository);
  }

  async getCandlesByCurrencyAndFrequency({ currencyPair, frequency }) {
    return await this.candlesRepository.getCandlesByCurrencyAndFrequency({
      currencyPair,
      frequency,
    });
  }
}

export { CandlesServices };
