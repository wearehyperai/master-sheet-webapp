import express, { NextFunction, Request, Response, Router } from 'express';
import nameRouter from './name.router';
import userRouter from './user.router';

export const router: Router = express.Router();

let reqCount = 1;
router.use((req: Request, res: Response, next: NextFunction) => {
    console.log("_______________________________________________________");
    console.log(req.method + ' Request for ' + req.url + ' at ' + new Date().toLocaleString() + "\nreqCount : " + reqCount);
    reqCount++;
    next();
});

router.use('/users', userRouter);
router.use('/name', nameRouter);

export default router;  
