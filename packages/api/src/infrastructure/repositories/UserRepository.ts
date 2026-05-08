// packages/api/src/infrastructure/repositories/UserRepository.ts
import { User } from 'src/types';
import { IUserRepository } from '../../application/contracts';
import { User } from '../sequelize/models/User';

export class UserRepository implements IUserRepository {
  public async findByUsername(username: string): Promise<User | null> {
    const user = await User.findOne({ where: { username } });
    return user ? user.toJSON() : null;
  }

  public async findById(id: number): Promise<User | null> {
    const user = await User.findByPk(id);
    return user ? user.toJSON() : null;
  }
}
