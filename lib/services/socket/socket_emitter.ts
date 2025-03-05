import { Socket } from "socket.io";
import { ErrorCodes } from "../../constants/server_codes";
import { CSVDataList, RecordData } from '../../model/csv_data';
import { SocketSendEvents } from "./socket_events";

/* const MIN_DIVISION_LIMIT = 50;
const DIVISION_COUNT = 50; */

export const sendParsedData = async (data: RecordData[], socket: Socket) => {
    console.log(data.length);

    if (data.length == 0) {
        return socket.emit(SocketSendEvents.socketErrorCode, ErrorCodes.emptyData);
    }

    if (data.length <= 1000) {
        socket.emit(SocketSendEvents.parsedDataCompleted, JSON.stringify(data));
        return;
    }

    const chunkSize = 64 * 1024; // 512kb
    let offset = 0;
    const allData = JSON.stringify(data);
    console.log(`allData length : ${allData.length}`);

    while (offset < allData.length) {
        const end = offset + chunkSize > allData.length ? allData.length : offset + chunkSize;
        const item = allData.substring(offset, end);
        offset = end;
        socket.emit(SocketSendEvents.parsedData, item);
    }
    socket.emit(SocketSendEvents.parsedDataCompleted,);
    /*
    let index = 0;
    while (index < data.length) {
        const end = data.length > index + 5000 ? index + 5000 : data.length;
        const sliced = data.slice(index, end);
        console.log(`sliced ${index} ${end} `);
        socket.emit(SocketSendEvents.parsedData, JSON.stringify(sliced));
        index += 5000;
    } */
}

export const sendUploadProgress = (totalSize: number, receivedSize: number, socket: Socket) => {
    const progress = ((receivedSize / totalSize) * 100).toFixed(2);
    console.log(progress);
    socket.emit(SocketSendEvents.uploadProgress, { progress, receivedSize });
}

export const sendUploadComplete = (socket: Socket) => {
    socket.emit(SocketSendEvents.uploadComplete, true);
}

export const sendUploadFailed = (message: string, socket: Socket) => {
    socket.emit(SocketSendEvents.socketErrorCode, message);
}

export const sendNameAPIResponse = (data: CSVDataList, socket: Socket) => {
    socket.emit(SocketSendEvents.nameAPIResponse, JSON.stringify(data));
}

export const sendLinkedInSearchAPIResponse = (data: CSVDataList, socket: Socket) => {
    socket.emit(SocketSendEvents.linkedInResponse, JSON.stringify(data));
}