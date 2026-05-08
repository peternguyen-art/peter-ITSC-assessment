import { injectable } from 'inversify';
import { IUserRepository } from 'src/application/contracts/repositories/IUserRepository';
import { IPasswordService } from 'src/application/contracts/services/IPasswordService';
import { LoginResponse, SignupDTO } from 'src/types/authentication';
import createError from 'http-errors';

@injectable()
export class SignupUseCase {
  constructor(
    @inject(IUserRepository) private userRepository: IUserRepository,
    @inject(IPasswordService) private passwordService: IPasswordService,
  ) {}

  async execute(signupData: SignupDTO): Promise<LoginResponse> {
    // 1. Check if username already exists
    const existingUser = await this.userRepository.findByUsername(signupData.username);
    if (existingUser) {
      throw createError(409, `Username already exists`);
    }

    // 2. Hash the password with bcrypt
    const hashedPassword = await this.passwordService.hashPassword(signupData.password);

    // 3. Create user with hashed password
    const user = await this.userRepository.create({
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      password: hashedPassword,
      username: signupData.username,
    });

    // 4. Return user WITHOUT password field
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
