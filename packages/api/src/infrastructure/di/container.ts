import 'reflect-metadata';
import { Container } from 'inversify';
import { IAssessmentRepository, IPasswordService, IUserRepository } from '../../application/contracts';
import { AssessmentRepository } from '../repositories/AssessmentRepository';
import { UserRepository } from '../repositories/UserRepository';
import { PasswordService } from '../../application/services/PasswordService';
import { createLogger, Logger } from '../logging/logger';
import { CreateAssessmentUseCase } from '../../application/features/assessments/create/useCase';
import { GetAssessmentListUseCase } from '../../application/features/assessments/getList/useCase';
import { CreateAssessmentController } from '../../application/features/assessments/create/controller';
import { GetAssessmentListController } from '../../application/features/assessments/getList/controller';
import { DeleteAssessmentUseCase } from '../../application/features/assessments/delete/useCase';
import { DeleteAssessmentController } from '../../application/features/assessments/delete/controller';
import { LoginUseCase } from '../../application/features/users/login/useCase';
import { SignupUseCase } from '../../application/features/users/signup/useCase';
import { LoginController } from '../../application/features/users/login/controller';
import { SignupController } from '../../application/features/users/signup/controller';

// Simple DI container implementation
const container = new Container();

// Initialize singletons
const logger = createLogger();

// Bind logger
container.bind(Logger).toConstantValue(logger);

// Bind repositories
container.bind(IAssessmentRepository).to(AssessmentRepository);
container.bind(IUserRepository).to(UserRepository);

// Bind use cases
container.bind(CreateAssessmentUseCase).toSelf();
container.bind(GetAssessmentListUseCase).toSelf();
container.bind(DeleteAssessmentUseCase).toSelf();
container.bind(LoginUseCase).toSelf();
container.bind(SignupUseCase).toSelf();
// Bind controllers
container.bind(CreateAssessmentController).toSelf();
container.bind(GetAssessmentListController).toSelf();
container.bind(DeleteAssessmentController).toSelf();
container.bind(LoginController).toSelf();
container.bind(SignupController).toSelf();

// Bind services
container.bind(IPasswordService).to(PasswordService);

export { container };
