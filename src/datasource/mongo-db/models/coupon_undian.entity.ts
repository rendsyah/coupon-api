// Import Modules
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// Define Coupon Undian Document
export type CouponUndianDocument = HydratedDocument<CouponUndian>;

@Schema({ collection: 'coupons_undian', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class CouponUndian {
    @Prop({ unique: true, isRequired: true })
    code: string;

    @Prop({ isRequired: true })
    prizeId: number;

    @Prop()
    promoId: number;

    @Prop()
    periodeId: number;

    @Prop({ default: 0 })
    variantId: number;

    @Prop({ default: 0 })
    status: number;

    @Prop({ isRequired: true })
    filename: string;

    @Prop({ isRequired: true })
    length: number;

    @Prop({ default: null })
    use_date: Date;

    @Prop({ default: 0 })
    is_delete: number;

    @Prop({ default: null })
    deleted_at: Date;
}

// Define Coupon Undian Schema
export const CouponUndianSchema = SchemaFactory.createForClass(CouponUndian);
