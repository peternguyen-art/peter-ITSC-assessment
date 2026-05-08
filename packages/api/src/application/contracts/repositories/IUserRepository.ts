import type { User } from '../../../types/users/User';

export interface IUserRepository {
  create(arg0: { firstName: string, lastName: string, password: string, username: string }): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
}

export const IUserRepository = Symbol.for(`IUserRepository`);
