import { DataSource, Repository } from "typeorm";
import { User } from "./user.model";
import createOrGetConnection from "../../db";
import { hashSync } from "bcrypt";
import type { createUserType } from "./user.schemas";

class UserService {
  constructor() {
    this.getReposirtoy()
      .then(() => {})
      .catch(() => {});
  }

  repository: Repository<User>;
  conn: DataSource;
  async getReposirtoy(): Promise<void> {
    this.conn = await createOrGetConnection();
    this.repository = this.conn.getRepository(User);
  }

  async getAllUsers() {
    return this.repository.find();
  }

  async getUserById(id: number) {
    return this.repository.findOne({ where: { id: id } });
  }
  async getUserByUsername(username: string) {
    return await this.repository.findOne({ where: { username: username } });
  }

  encryptPassword(password: string) {
    const saltRounds = 10;
    return hashSync(password, saltRounds);
  }

  async createUser({ username, password, email }: createUserType) {
    //create new User with hahsed password
    const saltRounds = 10;
    const hash = hashSync(password, saltRounds);

    // create user instance and save it to database
    const user = new User();
    user.username = username;
    user.password = hash;
    user.email = email;

    return await this.repository.insert(user);
  }

  async updateUser(id: number, user: User) {
    await this.repository.update(id, user);
    return this.getUserById(id);
  }

  async deleteUser(id: number) {
    await this.repository.delete(id);
    return { deleted: true };
  }
}

export default new UserService();
