export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export interface IUser {
  name: string; 
  email: string;
  role: UserRole;
}
