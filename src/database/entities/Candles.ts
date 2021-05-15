import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Job } from "./Job";

@Entity("candles")
class Candles {
  @PrimaryColumn()
  id: string;

  @Column()
  date: Date;

  @Column()
  open: Number;

  @Column()
  low: Number;

  @Column()
  high: Number;

  @Column()
  close: Number;
  
  @JoinColumn({name: 'job_id'})
  @ManyToOne(() => Job, (job) => job.candles)
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

export { Candles };
