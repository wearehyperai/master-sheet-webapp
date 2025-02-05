
export interface CSVData {
    keyValuePairs: Map<String, String>;
}

export interface CSVDataList {
    data: CSVData[];
    userId: number;
    socketId: string;
}