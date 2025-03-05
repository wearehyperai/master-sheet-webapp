import fs from "fs";
import path from "path";
import { Socket } from "socket.io";
import { uploadDir } from "../../app";
import { parseCSV } from "../../controllers/csv_data/csv.controller";
import { CSVDataList, RecordData } from '../../model/csv_data';
import { runLinkedInSearchAPI, runNameAPI } from "../server/server_socket_emitter";
import { sendLinkedInSearchAPIResponse, sendNameAPIResponse, sendParsedData, sendUploadComplete, sendUploadFailed, sendUploadProgress } from "./socket_emitter";

export const onUploadFile = (data: any, socket: Socket) => {
  try {
    const { chunk, totalSize, receivedSize } = data;
    console.log(`onUploadFile ${totalSize} ${receivedSize}`);
    let fileName: string = data.fileName;
    fileName = fileName.replace('.csv', `_${socket.id}.csv`);

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
  fileName = fileName.replace('.csv', `_${socket.id}.csv`);
  sendUploadComplete(socket);
  const filePath = path.join(uploadDir, fileName);
  if (fileName.endsWith(".csv")) {
    const parsedData = await parseCSV(filePath, socket.id);
    console.log(parsedData.length);
    sendParsedData(parsedData, socket);
    fs.rm(filePath, () => {
      console.log(`file deleted ${fileName}`);
    });
  }
}

export const onNameAPICall = async (data: any, socket: Socket) => {
  const parsedData: RecordData[] = data[0];
  const responseFields: string[] = data[1];
  const csvDataList: CSVDataList = {
    data: parsedData,
    socketId: socket.id,
    userId: 1,
  }
  const queueData: RecordData[] = [];
  let loadingRecord: RecordData = {
    keyValuePairs: {}
  };
  for (const response of responseFields) {
    loadingRecord.keyValuePairs[response] = 'Loading...';
  }
  console.log(`loadingRecord ${JSON.stringify(loadingRecord)}`);
  for (let i = 0; i < parsedData.length; i++) {
    queueData.push(loadingRecord);
  }
  const queueList: CSVDataList = {
    data: queueData,
    socketId: socket.id,
    userId: 1,
    loadingData: true,
  }
  sendNameAPIResponse(queueList, socket);
  runNameAPI(csvDataList, responseFields);
}

export const onLinkedInSearchAPICall = async (data: any, socket: Socket) => {
  const parsedData: RecordData[] = data[0];
  const responseFields: string[] = data[1];
  const csvDataList: CSVDataList = {
    data: parsedData,
    socketId: socket.id,
    userId: 1,
  }
  const queueData: RecordData[] = [];
  let loadingRecord: RecordData = {
    keyValuePairs: {}
  };
  for (const response of responseFields) {
    loadingRecord.keyValuePairs[response] = 'Loading...';
  }
  for (let i = 0; i < parsedData.length; i++) {
    queueData.push(loadingRecord);
  }
  const queueList: CSVDataList = {
    data: queueData,
    socketId: socket.id,
    userId: 1,
  }
  sendLinkedInSearchAPIResponse(queueList, socket);
  runLinkedInSearchAPI(csvDataList, responseFields);
}