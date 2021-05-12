import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Job } from "./Job";

@Entity("schedules_jobs")
class ScheduleJob {
  @PrimaryColumn()
  id: string;

  @Column()
  frequency: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({select: false})
  job_id: string

  @JoinColumn({ name: "job_id" })
  @ManyToOne(() => Job)
  job: Job

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { ScheduleJob };
