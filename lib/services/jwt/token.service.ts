import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status';
import { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../constants/constants";
import { StatusCodes } from "../../constants/server_codes";

const jwt = require('jsonwebtoken');

export const getTokens = (userEmail: string) => {
    return jwt.sign({ userEmail }, JWT_SECRET_KEY, { expiresIn: '2 days' });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET_KEY);
}

export interface SecureRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            res.status(httpStatus.UNAUTHORIZED).json({ message: 'Please authenticate' });
        }

        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        (req as SecureRequest).token = decoded;
        next();
    } catch (err) {
        console.log('auth error ' + err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.internalError });
    }
};