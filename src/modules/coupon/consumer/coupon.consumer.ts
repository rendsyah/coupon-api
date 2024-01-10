import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { IMongoDbModels } from '@datasource/interfaces/mongo-db.interface';
import { IProjectDbModels } from '@datasource/interfaces/project-db.interface';
import { MongoDbService } from '@datasource/mongo-db/mongo-db.service';
import { ProjectDbService } from '@datasource/project-db/project-db.service';
import {
    CouponFailedJob,
    CouponInsertJob,
    CouponInsertResponse,
    CouponUpdateJob,
    CouponUpdateResponse,
} from '../interfaces/coupon.interface';
import * as fs from 'fs';
import * as appRoot from 'app-root-path';
import * as csv from 'fast-csv';

@Processor('coupon-insert')
export class CouponInsertConsumer {
    private mongoDbModels: IMongoDbModels;

    constructor(private readonly mongoDbService: MongoDbService) {
        this.mongoDbModels = this.mongoDbService.getModels();
    }

    async generateCsv(params: CouponFailedJob): Promise<void> {
        const getDuplicateDir = `${appRoot}/../output/duplicate-coupon`;
        const getDuplicateFile = `duplicate-coupon-hexos.csv`;
        const getWritePath = `${getDuplicateDir}/${getDuplicateFile}`;

        const writeStream = fs.createWriteStream(`${getWritePath}`, { flags: 'a' });
        const writeFormat = csv.format({ headers: true, writeHeaders: true });

        writeFormat.write({ reason: params.error });
        writeFormat.pipe(writeStream);
    }

    @Process({ concurrency: 8 })
    async couponInsertQueue(job: Job<CouponInsertJob>): Promise<CouponInsertResponse> {
        const { coupon, variantId, filename, length } = job.data;

        await this.mongoDbModels.CouponModels.create({ coupon, variantId, filename, length });

        return {
            status: 'success',
            message: `insert coupon ${coupon}`,
        };
    }

    // @OnQueueFailed()
    // async onFailedQueue(job: Job<CouponInsertJob>, error: Error): Promise<void> {
    //     this.generateCsv({ ...job.data, error: error.message });
    // }
}

@Processor('coupon-update')
export class CouponUpdateConsumer {
    private mongoDbModels: IMongoDbModels;
    private projectDbModels: IProjectDbModels;

    constructor(private readonly mongoDbService: MongoDbService, private readonly projectDbService: ProjectDbService) {
        this.mongoDbModels = this.mongoDbService.getModels();
        this.projectDbModels = this.projectDbService.getModels();
    }

    @Process()
    async couponUpdateQueue(job: Job<CouponUpdateJob>): Promise<CouponUpdateResponse> {
        const { id, coupon } = job.data;

        const findCoupon = await this.mongoDbModels.CouponModels.findOne({ coupon });
        await this.projectDbModels.EntriesModels.update({ id }, { couponPeriod: findCoupon ? findCoupon.periodeId : 0 });

        return {
            id: findCoupon?.id || '',
            couponPeriod: findCoupon?.periodeId || 0,
        };
    }
}
