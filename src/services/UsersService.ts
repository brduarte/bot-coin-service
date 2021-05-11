import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositorys/JobsRepository";
import { hash } from "bcrypt"

interface IUserCreate {
  email: string;
  password: string;
}

class UsersServices {

  private usersRepository: UsersRepository
  
  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository)
  }

  async create({ email, password }: IUserCreate) {

    const userExists = await this.usersRepository.findOne({
      email,
    });

    if (userExists) {
      return userExists;
    }

    const passwordHash = await hash(password, 10)
    const user = this.usersRepository.create({
      email,
      password: passwordHash
    });

    await this.usersRepository.save(user);
    return user;
  }
}

export { UsersServices };
