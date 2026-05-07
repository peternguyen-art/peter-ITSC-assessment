import { inject, injectable } from 'inversify';
import { IUseCase } from 'src/types/shared';
import { IAssessmentRepository } from '../../../contracts';

@injectable()
export class DeleteAssessmentUseCase implements IUseCase<number, boolean> {
  public constructor(
    @inject(IAssessmentRepository) private assessmentRepository: IAssessmentRepository,
  ) {}

  public async execute(assessmentId: number): Promise<boolean> {
    return this.assessmentRepository.delete(assessmentId);
  }
}
