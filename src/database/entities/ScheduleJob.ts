import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Job } from "./Job";

@Entity("schedules_jobs")
class ScheduleJob {
  @PrimaryColumn()
  id: string;

  @Column()
  frequency: number;

  @OneToOne(() => Job, (job) => job.scheduleJob)
  job: Job;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { ScheduleJob };
