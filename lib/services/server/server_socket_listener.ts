import { deSerialize } from "../../middleware/serialization";
import { CSVDataList } from "../../model/csv_data";
import { connectedSockets } from "../socket/socket.service";
import { sendLinkedInSearchAPIResponse, sendNameAPIResponse } from '../socket/socket_emitter';

export const runNameAPIResponse = (data: Buffer) => {
    const csvData: CSVDataList = deSerialize(data);
    if (!csvData.socketId) return;
    const socket = connectedSockets.get(csvData.socketId);
    if (!socket) return;
    sendNameAPIResponse(csvData, socket);
}

export const runLinkedInSearchAPIResponse = (data: Buffer) => {
    const csvData: CSVDataList = deSerialize(data);
    if (!csvData.socketId) return;
    const socket = connectedSockets.get(csvData.socketId);
    if (!socket) return;
    sendLinkedInSearchAPIResponse(csvData, socket);
}