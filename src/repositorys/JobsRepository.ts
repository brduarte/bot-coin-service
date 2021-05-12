import { EntityRepository, Repository, Transaction } from "typeorm";
import { Job } from "../database/entities/Job";

@EntityRepository(Job)
class JobRepository extends Repository<Job> {}

export { JobRepository };
