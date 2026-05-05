import { IAssessmentRepository } from '../../application/contracts';
import { Assessment as AssessmentType, CreateAssessmentDTO } from '../../types';
import { Assessment as AssessmentModel } from '../sequelize/models/Assessment';

export class AssessmentRepository implements IAssessmentRepository {
  public async create(assessmentData: CreateAssessmentDTO): Promise<AssessmentType> {
    const createdAssessment = await AssessmentModel.create(assessmentData);

    return createdAssessment.toJSON() as AssessmentType;
  }

  public async findAll(): Promise<AssessmentType[]> {
    // TODO: Implement Find All
    return Promise.reject(new Error(`Not implemented`));
  }

  public async delete(id: number): Promise<boolean> {
    return Promise.reject(new Error(`Not implemented`));
  }
}
