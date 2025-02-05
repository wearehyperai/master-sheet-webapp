import { Request, Response } from "express";
import httpStatus from "http-status";
import { getErrorMessage } from "../constants/error_message";

export const getFullName = async (
    req: Request,
    res: Response) => {
    try {
        const { first_name, last_name } = req.body;
        if (!first_name || !last_name) {
            res.status(httpStatus.BAD_REQUEST).json({ message: 'Required Data Missing' });
            return;
        }

        const fullName = `${first_name}  ${last_name}`;
        res.status(httpStatus.OK).json({ full_name: fullName });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: getErrorMessage(error) });
    }
}
