import csv from 'csv-parser';
import fs from 'fs';
import { CSVData } from '../../model/csv_data';

export const parseCSV = (filePath: string, socketId: string): Promise<CSVData[]> => {
    return new Promise((resolve, reject) => {
        const results: CSVData[] = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                const csvData: CSVData = {
                    keyValuePairs: new Map<string, string>(Object.entries(data)),
                };
                return results.push(csvData);
            })
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}