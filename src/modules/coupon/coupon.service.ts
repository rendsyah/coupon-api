import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ExcelCoupon } from './interfaces/coupon.interface';
import { IMongoDbModels } from '@datasource/interfaces/mongo-db.interface';
import { IProjectDbModels } from '@datasource/interfaces/project-db.interface';
import { MongoDbService } from '@datasource/mongo-db/mongo-db.service';
import { ProjectDbService } from '@datasource/project-db/project-db.service';
import { HelperService } from '@commons/lib/helper/helper.service';
import * as fs from 'fs';
import * as appRoot from 'app-root-path';
import * as csv from 'fast-csv';
import * as xlsx from 'xlsx';

@Injectable()
export class CouponService {
    private mongoDbModels: IMongoDbModels;
    private projectDbModels: IProjectDbModels;

    constructor(
        private readonly mongoDbService: MongoDbService,
        private readonly projectDbService: ProjectDbService,
        private readonly helperService: HelperService,
        @InjectQueue('coupon-insert') private readonly couponInsertQueue: Queue,
        @InjectQueue('coupon-update') private readonly couponUpdateQueue: Queue,
    ) {
        this.mongoDbModels = this.mongoDbService.getModels();
        this.projectDbModels = this.projectDbService.getModels();
    }

    private sleep(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    private async _couponRead(path: string, ext: 'csv' | 'xlsx'): Promise<void> {
        const getFilename = path.split('/').splice(-1)[0];
        switch (ext) {
            case 'csv':
                fs.createReadStream(path)
                    .pipe(csv.parse({ headers: true, trim: true }))
                    // .pipe(csv.parse())
                    .on('error', (error) => {
                        console.log(error);
                    })
                    .on('data', async (data) => {
                        await this.couponInsertQueue.add({
                            coupon: data.coupon,
                            variantId: 1,
                            filename: getFilename,
                            length: data.coupon.length,
                            // coupon: data[0],
                            // variantId: 2,
                            // filename: getFilename,
                            // length: data[0].length,
                        });
                    })
                    .on('end', (count: number) => {
                        console.log(`parsed ${count} data`);
                    });
                break;

            case 'xlsx':
                const getExcel = xlsx.readFile(path);
                const getSheetName = getExcel.SheetNames[0];
                const getSheet = getExcel.Sheets[getSheetName];

                const getJson: ExcelCoupon[] = xlsx.utils.sheet_to_json(getSheet, { header: ['coupon'] });

                for (let idxExcel = 0; idxExcel < getJson.length; idxExcel++) {
                    const getData = getJson[idxExcel];
                    await this.couponInsertQueue.add({
                        coupon: getData.coupon,
                        variantId: getData.variantId,
                        filename: getFilename,
                        length: getData.coupon.length,
                    });
                }
                break;
        }
    }

    async couponInsert(): Promise<void> {
        const prefix = 'HEXOS';
        const coupon = 300;

        for (let index = 201; index <= coupon; index++) {
            await this.mongoDbModels.CouponModels.create({
                coupon: `${prefix}${index}`,
                variantId: 2,
                filename: 'hexos_barley_mint_0.csv',
            });
        }
    }

    async couponInsertRedeem(): Promise<void> {
        const coupon = 100;
        for (let index = 0; index < coupon; index++) {
            await this.mongoDbModels.CouponRedeemModels.create({
                code: this.helperService.validateRandomChar(9, 'alphanumeric'),
                filename: 'redeem-code.xlsx',
                length: 9,
                prizeId: 7,
            });
        }
    }

    async couponInsertUndian(): Promise<void> {
        const prefix = `HS`;
        const coupon = 60000;

        for (let index = 0; index < coupon; index++) {
            const getCode = `${prefix}${this.helperService.validateRandomChar(8, 'alphanumeric')}`;
            await this.mongoDbModels.CouponUndianModels.create({
                code: getCode,
                filename: 'undian-code.csv',
                length: getCode.length,
                prizeId: 11,
            })
                .then((v) => v)
                .catch((err) => err);
        }
    }

    async couponCheck(): Promise<void> {
        const getDir = `${appRoot}/../data`;
        const getUpdateDir = `${appRoot}/../output/updated-coupon`;
        const getFile = fs.readdirSync(getDir);

        const getDate = this.helperService.validateTime(new Date(), 'date-time-2');
        const outputFile = fs.createWriteStream(`${getUpdateDir}/updated-coupon-${getDate}.csv`);
        const streamFile = csv.format({ headers: true, writeHeaders: true });
        streamFile.pipe(outputFile);

        for (let index = 0; index < getFile.length; index++) {
            fs.createReadStream(`${getDir}/${getFile[index]}`)
                .pipe(csv.parse({ headers: true, trim: true }))
                .on('error', (error) => {
                    console.log(error);
                })
                .on('data', async (data) => {
                    this.mongoDbModels.CouponModels.findOne({ coupon: data.coupon }).then((value) => {
                        const getFormatCoupon = {
                            coupon: value ? value.coupon : data.coupon,
                            periode: value ? value.periodeId : 0,
                            status: value ? 'Valid' : 'Invalid',
                        };
                        streamFile.write(getFormatCoupon);
                    });
                })
                .on('end', (count: number) => {
                    console.log(`parsed ${count} data`);
                });
        }
    }

    async couponCheckDuplicate(): Promise<void> {
        const getCheckDir = `${appRoot}/../output/parse-coupon`;
        const getUpdateDir = `${appRoot}/../output/updated-coupon`;
        const getCheckFile = fs.readdirSync(getCheckDir);

        const getDate = this.helperService.validateTime(new Date(), 'date-time-2');
        const outputFile = fs.createWriteStream(`${getUpdateDir}/updated-coupon-${getDate}.csv`);
        const streamFile = csv.format({ headers: true, writeHeaders: true });
        streamFile.pipe(outputFile);

        for (let index = 0; index < getCheckFile.length; index++) {
            fs.createReadStream(`${getCheckDir}/${getCheckFile[index]}`)
                .pipe(csv.parse({ trim: true }))
                .on('error', (error) => {
                    console.log(error);
                })
                .on('data', async (data) => {
                    this.mongoDbModels.CouponModels.findOne({ coupon: data[0] })
                        .then((value) => {
                            if (value) {
                                console.log(data[0]);
                                const getFormatCoupon = {
                                    coupon: value.coupon,
                                    filename: getCheckFile[index],
                                    status: 'duplicate',
                                };
                                streamFile.write(getFormatCoupon);
                            }
                        })
                        .catch((error) => console.log(error));
                })
                .on('end', (count: number) => {
                    console.log(`parsed ${count} data`);
                });

            await this.sleep(10000);
        }
    }

    async couponInsertCsv(): Promise<void> {
        const getDir = `${appRoot}/../data`;
        const getFile = fs.readdirSync(getDir);

        for (let index = 0; index < getFile.length; index++) {
            const getFilename = getFile[index];
            const getPath = `${getDir}/${getFilename}`;
            await this._couponRead(getPath, 'csv');
            await this.sleep(10000);
        }
    }

    async couponInsertExcel(): Promise<void> {
        const getDir = `${appRoot}/../data`;
        const getFile = fs.readdirSync(getDir);

        for (let index = 0; index < getFile.length; index++) {
            const getFilename = getFile[index];
            const getPath = `${getDir}/${getFilename}`;
            await this._couponRead(getPath, 'xlsx');
        }
    }

    async couponUpdate(): Promise<void> {
        const getEntries = await this.projectDbModels.EntriesModels.find();

        for (let index = 0; index < getEntries.length; index++) {
            const getId = getEntries[index].id;
            const getCoupon = getEntries[index].coupon;

            await this.couponUpdateQueue.add({ id: getId, coupon: getCoupon });
        }
    }

    async couponCheckCount(): Promise<void> {
        const coupons: string[] = [];
        const totalLoop = 301;

        for (let index = 0; index < totalLoop; index++) {
            const filename = `hexos_mint_5butir_${index}.csv`;
            const getCount = await this.mongoDbModels.CouponModels.count({ filename });
            console.log(filename, getCount);
            if (getCount !== 50000) {
                coupons.push(filename);
            }
        }

        console.log(coupons);
    }
}
