import { IAssessmentRepository } from '../../application/contracts';
import { Assessment as AssessmentType, CreateAssessmentDTO } from '../../types';
import { Assessment as AssessmentModel } from '../sequelize/models/Assessment';

export class AssessmentRepository implements IAssessmentRepository {
  public async create(assessmentData: CreateAssessmentDTO): Promise<AssessmentType> {
    const createdAssessment = await AssessmentModel.create(assessmentData);

    return createdAssessment.toJSON();
  }

  public async findAll(): Promise<AssessmentType[]> {
    const assessments = await AssessmentModel.findAll();

    return assessments.map((assessment) => assessment.toJSON());
  }

  public async delete(id: number): Promise<boolean> {
    const deletedCount = await AssessmentModel.destroy({
      where: { id },
    });

    return deletedCount > 0;
  }
}
