import { Controller, Post, Route, Body } from 'tsoa';
import { IUser, UserRole } from '../types/IUser';
import { add } from '../lib/queue';

@Route('user')
export class UserController extends Controller {
  /**
   * Create a new user and send a welcome email.
   * @param user The user to create.
   */
  @Post()
  public async create(@Body() user: Omit<IUser, 'role'>): Promise<IUser> {
    await add('RegistrationMail', user);
    return {
      ...user,
      role: UserRole.User,
    };
  }
}
