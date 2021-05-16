import { EntityRepository, Repository } from "typeorm";
import { Currency } from "../database/entities/Currency";

@EntityRepository(Currency)
class CurrencysRepository extends Repository<Currency> {}

export { CurrencysRepository };
