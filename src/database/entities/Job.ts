import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("jobs")
class Job {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: 'currency_pair' })
  currencyPair: string;

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
