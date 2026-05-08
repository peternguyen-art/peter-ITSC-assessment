// packages/api/src/application/services/PasswordService.ts
import { compare, hash } from 'bcrypt';
import { injectable } from 'inversify';
import { IPasswordService } from '../contracts/services/IPasswordService';

const PASSWORD_SALT_ROUNDS = 10; // ← Security level (higher = slower but more secure)

@injectable()
export class PasswordService implements IPasswordService {
  public isSecurePassword(password: string): boolean {
    if (!password || typeof password !== `string`) {
      return false;
    }

    const minLength = 8;
    const hasMinLength = password.length >= minLength;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    const classesMet = [ hasUpper, hasLower, hasNumber, hasSymbol ].filter(Boolean).length;
    return hasMinLength && classesMet >= 3;
  }

  public async hashPassword(password: string) {
    return hash(password, PASSWORD_SALT_ROUNDS);
  }

  public async verifyPassword(password: string, hashedPassword: string) {
    const isValid = await compare(password, hashedPassword);
    if (!isValid) {
      throw new Error(`Invalid credentials`);
    }
    return isValid;
  }
}
