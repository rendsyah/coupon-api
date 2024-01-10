// Import Modules
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Import Base Repository
import { BaseRepository } from './base.repository';

// Import Entity
import { CouponRedeem, CouponRedeemDocument } from '../models/coupon_redeem.entity';

@Injectable()
export class CouponRedeemRepository extends BaseRepository<CouponRedeemDocument> {
    constructor(@InjectModel(CouponRedeem.name) private readonly couponRedeemModel: Model<CouponRedeemDocument>) {
        super(couponRedeemModel);
    }
}
