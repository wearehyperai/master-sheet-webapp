import fs from "fs";
import path from "path";
import { Socket } from "socket.io";
import { uploadDir } from "../../app";
import { parseCSV } from "../../controllers/csv_data/csv.controller";
import { CSVDataList } from "../../model/csv_data";
import { runNameAPI } from "../server/server_socket_emitter";
import { sendParsedData, sendUploadComplete, sendUploadFailed, sendUploadProgress } from "./socket_emitter";

let uploadCount = 1;

export const onUploadFile = (data: any, socket: Socket) => {
  try {
    const { chunk, totalSize, receivedSize } = data;
    let fileName: string = data.fileName;
    fileName = fileName.replace('.csv', `_${uploadCount}.csv`);

    const filePath = path.join(uploadDir, fileName);

    fs.appendFileSync(filePath, Buffer.from(chunk, "base64"));

    sendUploadProgress(totalSize, receivedSize, socket);

  } catch (error: any) {
    sendUploadFailed(error.message, socket);
    console.log(`onUploadFile Error : ${error.message}`);
  }
}

export const onUploadComplete = async (data: any, socket: Socket) => {
  let fileName: string = data.fileName;
  fileName = fileName.replace('.csv', `_${uploadCount}.csv`);
  sendUploadComplete(socket);
  uploadCount++;
  const filePath = path.join(uploadDir, fileName);
  if (fileName.endsWith(".csv")) {
    const parsedData = await parseCSV(filePath, socket.id);
    sendParsedData(parsedData, socket);
    const csvDataList: CSVDataList = {
      data: parsedData,
      socketId: socket.id,
      userId: 1,
    }
    runNameAPI(csvDataList);
  }
}

export const onNameAPICall = async (data: any, socket: Socket) => {

}