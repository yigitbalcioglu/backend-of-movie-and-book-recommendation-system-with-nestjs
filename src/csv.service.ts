import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parser';

@Injectable()
export class CsvService {
  async readCsv<T>(filePath: string): Promise<T[]> {
    const results: T[] = [];
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      fs.createReadStream(filePath)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        .pipe(csv())
        .on('data', (data: T) => results.push(data))
        .on('end', () => resolve(results))
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        .on('error', (error) => reject(error));
    });
  }
}
