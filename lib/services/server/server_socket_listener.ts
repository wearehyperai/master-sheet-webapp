import { deSerialize } from "../../middleware/serialization";
import { CSVDataList } from "../../model/csv_data";
import { connectedSockets } from "../socket/socket.service";
import { sendNameAPIResponse } from '../socket/socket_emitter';

export const runNameAPIResponse = (data: Buffer) => {
    const csvData: CSVDataList = deSerialize(data);
    console.log(csvData);
    if (!csvData.socketId) return;
    const socket = connectedSockets.get(csvData.socketId);
    if (!socket) return;
    sendNameAPIResponse(csvData, socket);
}