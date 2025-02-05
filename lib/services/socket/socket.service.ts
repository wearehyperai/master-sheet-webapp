import { Server, Socket } from "socket.io";
import { SESSION_EXP_TIME } from "../../constants/constants";
import { SERVER_AUTHENTICATION, setServerSocket } from "../../constants/server_socket_id";
import redisClient from "../redis/redis.service";
import { runNameAPIResponse } from "../server/server_socket_listener";
import { onNameAPICall, onUploadComplete, onUploadFile } from './socket_event_handler';
import { ServerSocketReceiveEvents, SocketReceiveEvents } from "./socket_events";

export const connectedSockets: Map<string, Socket> = new Map();

export const initializeSocket = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket: Socket) => {
        console.log("A user connected:", socket.id);
        connectedSockets.set(socket.id, socket);
        cacheSocketConnection(socket);

        socket.on(SocketReceiveEvents.uploadFile, (data) => onUploadFile(data, socket));
        socket.on(SocketReceiveEvents.uploadComplete, (data) => onUploadComplete(data, socket));
        socket.on(SocketReceiveEvents.nameAPICall, (data) => onNameAPICall(data, socket));

        socket.on(ServerSocketReceiveEvents.handshake, (data) => {
            if (data == SERVER_AUTHENTICATION) {
                cacheServerSocketConnection(socket, data);
                setServerSocket(socket.id, socket);
            }
        });
        socket.on(ServerSocketReceiveEvents.nameAPIResponse, (data) => runNameAPIResponse(data));

        socket.on("disconnect", async () => {
            console.log("User disconnected:", socket.id);
            deleteCacheData(socket);
        });
    });
}

const cacheSocketConnection = async (socket: Socket) => {
    const { userId } = socket.handshake.query;
    if (!userId) return;
    console.log("User ID:", userId);

    const cacheKey = socket.id;
    const data = {
        'userId': userId
    };
    await redisClient.set(cacheKey, JSON.stringify(data), { EX: SESSION_EXP_TIME });
}

const cacheServerSocketConnection = async (socket: Socket, auth: string) => {
    const cacheKey = socket.id;
    const data = {
        'userId': auth
    };
    await redisClient.set(cacheKey, JSON.stringify(data), { EX: SESSION_EXP_TIME });
}

const deleteCacheData = async (socket: Socket) => {
    const cacheKey = socket.id;
    await redisClient.del(cacheKey);
    connectedSockets.delete(socket.id);
}