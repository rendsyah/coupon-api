// Import All Entities Schema
import { CouponSchema } from './coupon.entity';
import { CouponRedeemSchema } from './coupon_redeem.entity';
import { CouponUndianSchema } from './coupon_undian.entity';

// Define All Mongo Entities
export const MongoDbEntitiesModels = [
    {
        name: 'Coupon',
        schema: CouponSchema,
    },
    {
        name: 'CouponRedeem',
        schema: CouponRedeemSchema,
    },
    {
        name: 'CouponUndian',
        schema: CouponUndianSchema,
    },
];
