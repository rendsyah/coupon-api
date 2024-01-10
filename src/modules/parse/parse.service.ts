import { Injectable } from '@nestjs/common';
import * as appRoot from 'app-root-path';
import * as fs from 'fs';
import * as xlsx from 'xlsx';

@Injectable()
export class ParseService {
    async parseCsv(): Promise<void> {
        const getOutputPath = `${appRoot}/../output/parse-coupon`;

        const getDir = `${appRoot}/../data`;
        const getFile = fs.readdirSync(getDir);

        for (let index = 0; index < getFile.length; index++) {
            const getWorkBook = xlsx.readFile(`${getDir}/${getFile[index]}`);
            const getFilename = `${getFile[index].split('.')[0]}.csv`;
            xlsx.writeFile(getWorkBook, `${getOutputPath}/${getFilename}`, { bookType: 'csv' });
        }
    }
}
