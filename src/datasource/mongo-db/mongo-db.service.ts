// Import Modules
import { Injectable } from '@nestjs/common';

// Import Interfaces
import { IMongoDbModels } from '@datasource/interfaces/mongo-db.interface';

// Import Repository
import { CouponRedeemRepository, CouponRepository, CouponUndianRepository } from './repository';

@Injectable()
export class MongoDbService {
    constructor(
        private readonly couponRepository: CouponRepository,
        private readonly couponRedeemRepository: CouponRedeemRepository,
        private readonly couponUndianRepository: CouponUndianRepository,
    ) {}

    getModels(): IMongoDbModels {
        return {
            CouponModels: this.couponRepository,
            CouponRedeemModels: this.couponRedeemRepository,
            CouponUndianModels: this.couponUndianRepository,
        };
    }
}
