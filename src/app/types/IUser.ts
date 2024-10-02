export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type CreateUserRequest = Omit<IUser, 'role'>;