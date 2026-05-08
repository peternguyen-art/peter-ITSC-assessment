// packages/api/src/infrastructure/repositories/UserRepository.ts
import type { User as UserType } from '../../types/users/User';
import { IUserRepository } from '../../application/contracts';
import { User as UserModel } from '../sequelize/models/User';

export class UserRepository implements IUserRepository {
  public async create(userData: {
    firstName: string;
    lastName: string;
    password: string;
    username: string;
  }): Promise<UserType> {
    const user = await UserModel.create(userData);
    return user.toJSON();
  }

  public async findByUsername(username: string): Promise<UserType | null> {
    const user = await UserModel.findOne({ where: { username } });
    return user ? user.toJSON() : null;
  }

  public async findById(id: number): Promise<UserType | null> {
    const user = await UserModel.findByPk(id);
    return user ? user.toJSON() : null;
  }
}
