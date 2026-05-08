import { injectable } from 'inversify';
import { Request } from 'express';
import { SignupDTO } from 'src/types';
import { BaseController } from '../../../../infrastructure/http/BaseController';
import { SignupUseCase } from './useCase';
import { signupSchema } from './validator';

@injectable()
export class SignupController extends BaseController {
  public constructor(
    private signupUseCase: SignupUseCase,
  ) {
    super();
  }

  protected async executeImpl(req: Request): Promise<any> {
    const dto = signupSchema.validate(req.body);

    if (dto.error) {
      throw new Error(`Validation error: ${dto.error.message}`);
    }

    const assessment = await this.signupUseCase.execute(dto.value as SignupDTO);

    return assessment;
  }
}
