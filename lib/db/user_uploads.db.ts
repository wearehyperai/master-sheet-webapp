import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { StatusCodes } from "../constants/server_codes";
import { RecordData } from "../model/csv_data";
import prisma from '../services/prisma/prisma.service';

export class UserUploads {
    static insertUserUploads = async (data: RecordData[], userId: number, workspaceId: number) => {
        try {
            const savedUser = await prisma.userUploads.create({
                data: {
                    data: JSON.stringify(data),
                    userId: userId,
                    workspaceId: workspaceId,
                },
            });
            return savedUser;
        } catch (e) {
            return StatusCodes.internalError;
        }
    }

    static deleteUserUploads = async (userId: number) => {
        try {
            const result = await prisma.userUploads.deleteMany({
                where: { userId: userId, workspaceId: 1 }
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

    static updateUserUploads = async (data: RecordData[], id: string) => {
        try {
            const updatedUser = await prisma.userUploads.update({
                data: data,
                where: { id: id }
            });
            return updatedUser;
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
                return StatusCodes.notFound;
            }
            return StatusCodes.internalError;
        }
    }

    static getUserUploads = async (userId: number) => {
        try {
            const result = await prisma.userUploads.findFirst({
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