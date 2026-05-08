import { User } from '../../../types';

export interface IUserRepository {
  create(arg0: { firstName: string, lastName: string, password: string, username: string }): unknown;
  findById(id: number): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
}

export const IUserRepository = Symbol.for(`IUserRepository`);
