import { getCustomRepository } from "typeorm";
import { hash } from "bcrypt";
import { JobRepository } from "../repositorys/JobsRepository";

interface IJobCreate {
  email: string;
  password: string;
}

class JobsService {
  private jobRepository: JobRepository;
  usersRepository: any;

  constructor() {
    this.jobRepository = getCustomRepository(JobRepository);
  }

  async create({ email, password }: IJobCreate) {}
}

export { JobsService };
