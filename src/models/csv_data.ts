
export interface RecordData {
    keyValuePairs: Record<string, string>;
}

export interface CSVDataList {
    data: RecordData[];
    userId: number;
    socketId: string;
    id?: number;
    loadingData: boolean;
}