import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Job } from "./Job";

@Entity("currencys")
class Currency {
  @PrimaryColumn()
  id: string;

  @Column()
  currency_pair: string;

  @OneToMany(() => Job, (job) => job.currency)
  jobs: [];

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

export { Currency };
