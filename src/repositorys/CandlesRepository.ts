import { EntityRepository, Repository } from "typeorm";
import { Candles } from "../database/entities/Candles";

@EntityRepository(Candles)
class CandlesRepository extends Repository<Candles> {}

export { CandlesRepository };
