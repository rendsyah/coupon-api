// Import Modules
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Import Base Repository
import { BaseRepository } from './base.repository';

// Import Entity
import { Coupon, CouponDocument } from '../models/coupon.entity';

@Injectable()
export class CouponRepository extends BaseRepository<CouponDocument> {
    constructor(@InjectModel(Coupon.name) private readonly couponModel: Model<CouponDocument>) {
        super(couponModel);
    }
}
