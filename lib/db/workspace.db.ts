import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { StatusCodes } from "../constants/server_codes";
import { RecordData } from "../model/csv_data";
import prisma from '../services/prisma/prisma.service';

export class UserWorkSpace {
    static createUserWorkSpace = async (userId: number) => {
        try {
            const savedUser = await prisma.userWorkspaces.create({
                data: {
                    userId: userId,
                },
            });
            return savedUser;
        } catch (e) {
            return StatusCodes.internalError;
        }
    }

    static deleteUserWorkSpace = async (Id: string) => {
        try {
            const result = await prisma.userWorkspaces.deleteMany({
                where: { id: Id, }
            });
            return result;
        }
        catch (e) {
            if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
                return StatusCodes.notFound;
            }
            return StatusCodes.internalError;
        }
    }

    static updateUserWorkSpace = async (data: RecordData[], id: string) => {
        try {
            const updated = await prisma.userWorkspaces.update({
                data: data,
                where: { id: id }
            });
            return updated;
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
                return StatusCodes.notFound;
            }
            return StatusCodes.internalError;
        }
    }

    static getUserWorkSpace = async (userId: number) => {
        try {
            const result = await prisma.userWorkspaces.findFirst({
                where: { userId: userId, }
            });
            if (!result) {
                return StatusCodes.notFound;
            }
            return result;
        } catch (e) {
            return StatusCodes.internalError;
        }
    }
}