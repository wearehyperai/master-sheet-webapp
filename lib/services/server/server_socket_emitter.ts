import { serverSocket } from "../../constants/server_socket_id";
import { serialize } from "../../middleware/serialization";
import { CSVDataList } from "../../model/csv_data";
import { ServerSocketSendEvents } from "../socket/socket_events";

export const runNameAPI = (csvData: CSVDataList, responseFields: string[]) => {
    if (!serverSocket) return;
    const data = serialize(csvData);
    const serializedResponseFields = serialize(responseFields);
    serverSocket.emit(ServerSocketSendEvents.runNameApi, [data, serializedResponseFields]);
}

export const runLinkedInSearchAPI = (csvData: CSVDataList, responseFields: string[]) => {
    if (!serverSocket) return;
    const data = serialize(csvData);
    const serializedResponseFields = serialize(responseFields);
    serverSocket.emit(ServerSocketSendEvents.runLinkedInApi, [data, serializedResponseFields]);
}