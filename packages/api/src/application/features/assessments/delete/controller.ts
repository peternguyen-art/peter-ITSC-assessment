import { injectable } from 'inversify';
import { Request } from 'express';
import { BaseController } from '../../../../infrastructure/http/BaseController';
import { DeleteAssessmentUseCase } from './useCase';

@injectable()
export class DeleteAssessmentController extends BaseController {
  public constructor(
    private deleteAssessmentUseCase: DeleteAssessmentUseCase,
  ) {
    super();
  }

  protected async executeImpl(req: Request): Promise<any> {
    const assessmentId = parseInt(
      Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
      10,
    );

    if (isNaN(assessmentId)) {
      throw new Error(`Invalid assessment ID: ${assessmentId}`);
    } else if (assessmentId <= 0) {
      throw new Error(`Assessment ID must be a positive integer`);
    }

    const deleted = await this.deleteAssessmentUseCase.execute(assessmentId);

    if (!deleted) {
      throw new Error(`Assessment with ID ${assessmentId} not found`);
    }

    return {
      id: assessmentId,
      deleted: true,
      message: `Assessment with ID ${assessmentId} deleted successfully`,
    };
  }
}
