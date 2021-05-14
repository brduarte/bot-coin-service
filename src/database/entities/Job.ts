import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { ScheduleJob } from "./ScheduleJob";

@Entity("jobs")
class Job {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: "currency_pair" })
  currencyPair: string;

  @JoinColumn({name: 'schedule_job_id'})
  @OneToOne(() => ScheduleJob, scheduleJob => scheduleJob.job)
  scheduleJob: ScheduleJob;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Job };
