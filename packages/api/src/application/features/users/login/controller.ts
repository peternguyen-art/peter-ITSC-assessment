import { injectable } from 'inversify';
import { Request } from 'express';
import { BaseController } from '../../../../infrastructure/http/BaseController';
import { LoginUseCase } from './useCase';
import { loginSchema, LoginResponse } from '../validator';

@injectable()
export class LoginController extends BaseController {
  public constructor(
    private loginUseCase: LoginUseCase,
  ) {
    super();
  }

  protected async executeImpl(req: Request): Promise<LoginResponse> {
    const dto = loginSchema.validate(req.body);

    if (dto.error) {
      throw new Error(`Validation error: ${dto.error.message}`);
    }

    const user = await this.loginUseCase.execute(dto.value as any);

    return user;
  }
}
