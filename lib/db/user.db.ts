import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { StatusCodes } from "../constants/server_codes";
import { User } from "../model/user";
import prisma from "../services/prisma/prisma.service";

export class UserDB {

    static insertUser = async (data: User) => {
        try {
            const savedUser = await prisma.user.create({
                data: data,
            });
            return savedUser;
        } catch (e) {
            return StatusCodes.internalError;
        }
    }


    static deleteUser = async (data: User) => {
        try {
            const result = await prisma.user.delete({
                where: { id: data.id }
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

    static updateUser = async (data: User, userId: number) => {
        try {
            const updatedUser = await prisma.user.update({
                data: data,
                where: { id: userId }
            });
            return updatedUser;
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
                return StatusCodes.notFound;
            }
            return StatusCodes.internalError;
        }
    }

    static getUsers = async () => {
        try {
            const result = await prisma.user.findMany();
            if (result.length == 0) {
                return StatusCodes.notFound;
            }
            return result;
        } catch (e) {
            return StatusCodes.internalError;
        }
    }

    static findUser = async (email: string) => {
        try {
            const result = await prisma.user.findFirst({
                where: { email: email, }
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