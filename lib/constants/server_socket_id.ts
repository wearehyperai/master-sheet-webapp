import { Socket } from "socket.io";

export let serverSocketId = '';

export let serverSocket: Socket;
export const SERVER_AUTHENTICATION = 'kYqy6yXqrM0pcf54eYBeSfPaGmJ9t4vu';
export const setServerSocket = (id: string, socket: Socket) => {
    serverSocket = socket;
    serverSocketId = id;
    console.log(`setServerSocket ${serverSocketId}`);
}