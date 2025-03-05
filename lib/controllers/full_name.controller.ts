import { Request, Response } from "express";
import httpStatus from "http-status";
import { getErrorMessage } from "../constants/error_message";
import { NameAPIResult } from '../types/name_api_types';

export const getFullName = async (
    req: Request,
    res: Response) => {
    try {
        const { last_name } = req.body;
        const first_name: string = req.body.first_name;
        if (!first_name || !last_name) {
            res.status(httpStatus.BAD_REQUEST).json({ message: 'Required Data Missing' });
            return;
        }
        const fullName = `${first_name}  ${last_name}`;
        const initials = `${first_name.substring(0, 1)}. ${last_name}`;
        const data: NameAPIResult = {
            full_name: fullName,
            initials: initials
        }
        console.log(JSON.stringify(data));
        res.status(httpStatus.OK).json(data);
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: getErrorMessage(error) });
    }
}
