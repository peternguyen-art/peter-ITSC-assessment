import { User } from '../users/User';

export type LoginResponse = Omit<User, `password`>;
