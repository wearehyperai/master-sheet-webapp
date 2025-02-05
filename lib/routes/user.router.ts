import express, { Router } from 'express';
import { userRoutes } from '../constants/routes';
import { loginUser, signupUser } from '../controllers/user/user.controller';

const userRouter: Router = express.Router();

userRouter.post(userRoutes.login, loginUser);
userRouter.post(userRoutes.signup, signupUser);

export default userRouter;