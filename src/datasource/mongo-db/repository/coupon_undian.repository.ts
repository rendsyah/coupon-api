// Import Modules
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Import Base Repository
import { BaseRepository } from './base.repository';

// Import Entity
import { CouponUndian, CouponUndianDocument } from '../models/coupon_undian.entity';

@Injectable()
export class CouponUndianRepository extends BaseRepository<CouponUndianDocument> {
    constructor(@InjectModel(CouponUndian.name) private readonly couponUndianModel: Model<CouponUndianDocument>) {
        super(couponUndianModel);
    }
}
