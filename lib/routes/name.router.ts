import express, { Router } from 'express';
import { crudRoutes } from '../constants/routes';
import { getFullName } from '../controllers/full_name.controller';

const nameRouter: Router = express.Router();

nameRouter.post(crudRoutes.get, getFullName);

export default nameRouter;