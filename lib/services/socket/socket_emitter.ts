import { Socket } from "socket.io";
import { ErrorCodes } from "../../constants/server_codes";
import { serialize } from '../../middleware/serialization';
import { CSVData } from "../../model/csv_data";
import { SocketSendEvents } from "./socket_events";

/* const MIN_DIVISION_LIMIT = 50;
const DIVISION_COUNT = 50; */

export const sendParsedData = (data: CSVData[], socket: Socket) => {
    console.log(data.length);
    if (data.length == 0) {
        return socket.emit(SocketSendEvents.socketErrorCode, ErrorCodes.emptyData);
    }
    const serializedData = serialize(data);
    socket.emit(SocketSendEvents.parsedData, JSON.stringify(serializedData));
}

export const sendUploadProgress = (totalSize: number, receivedSize: number, socket: Socket) => {
    const progress = ((receivedSize / totalSize) * 100).toFixed(2);
    socket.emit(SocketSendEvents.uploadProgress, { progress, receivedSize });
}

export const sendUploadComplete = (socket: Socket) => {
    socket.emit(SocketSendEvents.uploadComplete);
}

export const sendUploadFailed = (message: string, socket: Socket) => {
    socket.emit(SocketSendEvents.socketErrorCode, message);
}

export const sendNameAPIResponse = (data: any, socket: Socket) => {
    const serializedData = serialize(data);
    socket.emit(SocketSendEvents.nameAPIResponse, serializedData);
}