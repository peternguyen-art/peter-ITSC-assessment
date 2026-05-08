export interface User {
  id?: number;
  createdAt?: Date;
  deletedAt?: Date | null;
  firstName: string;
  lastName: string;
  password: string;
  updatedAt?: Date;
  username: string;
}
