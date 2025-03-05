import csv from 'csv-parser';
import fs from 'fs';
import { RecordData } from '../../model/csv_data';

export const parseCSV = (filePath: string, socketId: string): Promise<RecordData[]> => {
    return new Promise((resolve, reject) => {
        const results: RecordData[] = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                const csvData: RecordData = {
                    keyValuePairs: data,
                };
                return results.push(csvData);
            })
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}