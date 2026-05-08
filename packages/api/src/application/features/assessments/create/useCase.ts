import { inject, injectable } from 'inversify';
import { IUseCase } from '../../../../types/shared';
import { Assessment, CreateAssessmentDTO } from '../../../../types';
import { IAssessmentRepository } from '../../../contracts';

@injectable()
export class CreateAssessmentUseCase implements IUseCase<CreateAssessmentDTO, Assessment> {
  public constructor(
    @inject(IAssessmentRepository) private assessmentRepository: IAssessmentRepository,
  ) {}

  public async execute(assessmentData: CreateAssessmentDTO): Promise<Assessment> {
    this.validateScore(assessmentData.score);

    const expectedRiskLevel = this.calculateRiskLevel(assessmentData.score);

    if (assessmentData.riskLevel !== expectedRiskLevel) {
      throw new Error(`Risk level must be ${expectedRiskLevel} for score ${assessmentData.score}`);
    }

    return this.assessmentRepository.create(assessmentData);
  }

  private validateScore(score: number): void {
    if (score < 0 || score > 5) {
      throw new Error(`Score must be between 0 and 5`);
    }
  }

  private calculateRiskLevel(score: number): string {
    if (score <= 1) {
      return `low`;
    }

    if (score <= 3) {
      return `medium`;
    }

    return `high`;
  }
}
