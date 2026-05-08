import { inject, injectable } from 'inversify';
import { IUserRepository } from 'src/application/contracts/repositories/IUserRepository';
import { IPasswordService } from 'src/application/contracts/services/IPasswordService';
import { LoginDTO, LoginResponse } from 'src/types';
import createError from 'http-errors';

@injectable()
export class LoginUseCase {
  constructor(
    @inject(IUserRepository) private userRepository: IUserRepository,
    @inject(IPasswordService) private passwordService: IPasswordService,
  ) {}

  async execute(loginData: LoginDTO): Promise<LoginResponse> {
    // 1. Find user by username
    const user = await this.userRepository.findByUsername(loginData.username);
    if (!user) {
      throw createError(401, `Invalid username or password`);
    }

    // 2. Verify password: compares plaintext input with stored hash
    const isPasswordValid = await this.passwordService.verifyPassword(
      loginData.password, // ← What user typed
      user.password, // ← Hash stored in DB
    );

    if (!isPasswordValid) {
      throw createError(401, `Invalid username or password`);
    }

    // 3. Return user WITHOUT password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
