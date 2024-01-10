// Import All Repository
import { CouponRedeemRepository, CouponRepository, CouponUndianRepository } from '@datasource/mongo-db/repository';

// Define Mongo DB Models Interfaces
export interface IMongoDbModels {
    CouponModels: CouponRepository;
    CouponRedeemModels: CouponRedeemRepository;
    CouponUndianModels: CouponUndianRepository;
}
