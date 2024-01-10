// Import Modules
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// Define Coupon Document
export type CouponDocument = HydratedDocument<Coupon>;

@Schema({ collection: 'coupons', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Coupon {
    @Prop({ unique: true, isRequired: true })
    coupon: string;

    @Prop({ default: 0 })
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

// Define Coupon Schema
export const CouponSchema = SchemaFactory.createForClass(Coupon);
