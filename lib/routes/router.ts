import express, { NextFunction, Request, Response, Router } from 'express';
import { CSVData, CSVDataList } from '../model/csv_data';
import { runNameAPI } from '../services/server/server_socket_emitter';
import nameRouter from './name.router';
import userRouter from './user.router';

export const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    console.log("home");
    res.send("Welcome to Hyper Server 0.0.0 ");
});

router.get('/callName', async (req: Request, res: Response) => {
    console.log("home");
    const csvDataList: CSVData[] = [
        createCSVData('John', 'Doe'),
        createCSVData('Jane', 'Smith'),
        createCSVData('Alice', 'Johnson'),
        createCSVData('Bob', 'Williams'),
        createCSVData('Emma', 'Brown')
    ];
    await new Promise((resolve, reject) => setTimeout(() => {
        resolve(1);
    }, 1000));

    console.log(`running api length ${csvDataList.length}`);
    const csvData: CSVDataList = {
        data: csvDataList,
        socketId: 'socket.id',
        userId: 1,
    }
    runNameAPI(csvData);
    res.send("Welcome to Hyper Server 0.0.0 ");
});


function createCSVData(firstName: string, lastName: string): CSVData {
    return {
        keyValuePairs: new Map([
            ['FirstName', firstName],
            ['LastName', lastName]
        ]),
    };
}


router.use((req: Request, res: Response, next: NextFunction) => {
    console.log("_______________________________________________________");
    console.log(req.method + ' Request for ' + req.url + ' at ' + new Date().toLocaleString());
    next();
});


router.use('/users', userRouter);
router.use('/name', nameRouter);

export default router;  
