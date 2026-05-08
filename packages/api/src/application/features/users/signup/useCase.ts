import { inject, injectable } from 'inversify';
import createError from 'http-errors';
import { IUserRepository } from '../../../contracts/repositories/IUserRepository';
import { IPasswordService } from '../../../contracts/services/IPasswordService';
import { LoginResponse } from '../../../../types/authentication/LoginResponse';
import { SignupDTO } from '../../../../types/authentication/SignupDTO';

@injectable()
export class SignupUseCase {
  public constructor(
    @inject(IUserRepository) private userRepository: IUserRepository,
    @inject(IPasswordService) private passwordService: IPasswordService,
  ) {}

  public async execute(signupData: SignupDTO): Promise<LoginResponse> {
    const existingUser = await this.userRepository.findByUsername(signupData.username);
    if (existingUser) {
      throw createError(409, `Username already exists`);
    }

    const hashedPassword = await this.passwordService.hashPassword(signupData.password);

    const user = await this.userRepository.create({
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      password: hashedPassword,
      username: signupData.username,
    });

    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
