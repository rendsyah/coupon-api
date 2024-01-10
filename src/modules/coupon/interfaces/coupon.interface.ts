// Define Excel Coupon
export interface ExcelCoupon {
    coupon: string;
    variantId?: number;
}

// Define Coupon Update Job
export interface CouponUpdateJob {
    id: number;
    coupon: string;
}

// Define Coupon Insert Job
export interface CouponInsertJob {
    coupon?: string;
    variantId?: number;
    filename?: string;
    length: number;
}

// Define Coupon Failed Job
export interface CouponFailedJob extends CouponInsertJob {
    error: string;
}

// Define Coupon Update Response
export interface CouponUpdateResponse {
    id: string;
    couponPeriod: number;
}

// Define Coupon Insert Response
export interface CouponInsertResponse {
    status: string;
    message: string;
}
