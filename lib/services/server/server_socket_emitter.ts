import { serverSocket } from "../../constants/server_socket_id";
import { serialize } from "../../middleware/serialization";
import { CSVDataList } from "../../model/csv_data";
import { ServerSocketSendEvents } from "../socket/socket_events";

export const runNameAPI = (csvData: CSVDataList) => {
    if (!serverSocket) return;
    const data = serialize(csvData);
    serverSocket.emit(ServerSocketSendEvents.runNameApi, data);
}