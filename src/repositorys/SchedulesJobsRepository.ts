import { EntityRepository, Repository } from "typeorm";
import { ScheduleJob } from "../database/entities/ScheduleJob";

@EntityRepository(ScheduleJob)
class SchedulesJobsRepository extends Repository<ScheduleJob> {}

export { SchedulesJobsRepository };
