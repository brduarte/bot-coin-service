import { EntityRepository, Repository } from "typeorm";
import { ScheduleJob } from "../database/entities/ScheduleJob";

@EntityRepository(ScheduleJob)
class SchedulesJobs extends Repository<ScheduleJob> {}

export { SchedulesJobs };
