import { Router } from 'express';
import { LoginController } from '../application/features/users/login/controller';
import { SignupController } from '../application/features/users/signup/controller';
import { container } from '../infrastructure/di/container';

const userRouter = Router();

const loginController = container.get(LoginController);
const signupController = container.get(SignupController);

userRouter.post(`/login`, loginController.execute);
userRouter.post(`/signup`, signupController.execute);

export { userRouter };
