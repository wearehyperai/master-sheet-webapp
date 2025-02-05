import { Request, Response } from "express";
import httpStatus from "http-status";
import { getErrorMessage } from "../../constants/error_message";
import { ErrorCodes, StatusCodes } from "../../constants/server_codes";
import { UserDB } from "../../db/user.db";
import { User } from "../../model/user";
import { compareHashData, getHashData } from "../../services/hashing.service";
import { getTokens } from "../../services/jwt/token.service";

export const signupUser = async (
    req: Request,
    res: Response) => {
    try {
        const userData: User = req.body;

        userData.password_hash = await getHashData(userData.password_hash);

        const result = await UserDB.insertUser(userData);
        if (result == StatusCodes.internalError) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.internalError });
            return;
        }
        const token = await getTokens(result.email);
        console.log(`signup user ${token}`);
        res.status(httpStatus.OK).json({ user: result, token: token });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: getErrorMessage(error) });
    }
}

export const loginUser = async (
    req: Request,
    res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(httpStatus.BAD_REQUEST).json({ message: ErrorCodes.requiredData });
            return;
        }

        const result = await UserDB.findUser(email);

        if (result == StatusCodes.notFound) {
            res.status(httpStatus.NOT_FOUND).json({ message: ErrorCodes.registerFirst });
            return;
        }

        if (result == StatusCodes.internalError) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: StatusCodes.internalError });
            return;
        }

        const isMatch = compareHashData(password, result.password_hash);
        if (!isMatch) {
            res.status(httpStatus.UNAUTHORIZED).json({ message: ErrorCodes.wrongPassword });
            return;
        }
        const token = await getTokens(result.email);
        console.log(`loginUser user ${token}`);
        res.status(httpStatus.OK).json({ user: result, token: token });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: getErrorMessage(error) });
    }
}
