import { Repository } from "typeorm";

import AppDataSource from "@database/ormconfig";
import ICreateUserDTO from "@modules/accounts/dtos/ICreateUserDTO";
import IUserRepository from "@modules/accounts/repositories/IUserRepository";

import User from "../entities/User";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(user: ICreateUserDTO): Promise<void> {
    const newUser = this.repository.create(user);

    await this.repository.save(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });

    return user;
  }
}

export default UserRepository;
