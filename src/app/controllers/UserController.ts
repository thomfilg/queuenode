import { Body, Controller, Post, Route } from 'tsoa';
import { add } from '../lib/queue';
import { CreateUserRequest, IUser, UserRole } from '../types/IUser';

@Route('user')
export class UserController extends Controller {
  /**
   * Create a new user and send a welcome email.
   * @param user The user to create.
   */
  @Post()
  public async create(@Body() user: CreateUserRequest): Promise<IUser> {
    await add('RegistrationMail', user);
    return {
      ...user,
      role: UserRole.User,
    };
  }
}
