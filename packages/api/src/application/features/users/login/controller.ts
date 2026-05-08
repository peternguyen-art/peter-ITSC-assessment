import { injectable } from 'inversify';
import { Request } from 'express';
import { LoginDTO } from '../../../../types';
import { BaseController } from '../../../../infrastructure/http/BaseController';
import { LoginUseCase } from './useCase';
import loginSchema from './validator';

@injectable()
export class LoginController extends BaseController {
  public constructor(
    private loginUseCase: LoginUseCase,
  ) {
    super();
  }

  protected async executeImpl(req: Request): Promise<any> {
    const dto = loginSchema.validate(req.body);

    if (dto.error) {
      throw new Error(`Validation error: ${dto.error.message}`);
    }

    const assessment = await this.loginUseCase.execute(dto.value as LoginDTO);

    return assessment;
  }
}
