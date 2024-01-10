// Import All Repository
import { CouponRedeemRepository, CouponRepository, CouponUndianRepository } from './repository';

// Define All Mongo DB Providers
export const MongoDbProviders = [CouponRepository, CouponRedeemRepository, CouponUndianRepository];
