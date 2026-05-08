import { inject, injectable } from 'inversify';
import createError from 'http-errors';
import { IUserRepository } from '../../../contracts/repositories/IUserRepository';
import { IPasswordService } from '../../../contracts/services/IPasswordService';
import { LoginDTO, LoginResponse } from '../../../../types';

@injectable()
export class LoginUseCase {
  public constructor(
    @inject(IUserRepository) private userRepository: IUserRepository,
    @inject(IPasswordService) private passwordService: IPasswordService,
  ) {}

  public async execute(loginData: LoginDTO): Promise<LoginResponse> {
    const user = await this.userRepository.findByUsername(loginData.username);
    if (!user) {
      throw createError(401, `Invalid username or password`);
    }

    const isPasswordValid = await this.passwordService.verifyPassword(
      loginData.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw createError(401, `Invalid username or password`);
    }

    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
