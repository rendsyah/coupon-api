import { Controller, Get } from '@nestjs/common';
import { ApiGetServiceDocs } from '@commons/config/swagger/api-swagger.docs';
import { CouponService } from './coupon.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Coupon')
@Controller('coupon')
export class CouponController {
    constructor(private readonly couponService: CouponService) {}

    @Get('/check')
    @ApiGetServiceDocs('coupon check')
    async couponCheckController() {
        return await this.couponService.couponCheck();
    }

    @Get('/check/duplicate')
    @ApiGetServiceDocs('coupon check duplicate')
    async couponCheckDuplicateController() {
        return await this.couponService.couponCheckDuplicate();
    }

    @Get('/check/count')
    @ApiGetServiceDocs('coupon check count')
    async couponCheckCountController() {
        return await this.couponService.couponCheckCount();
    }

    @Get('/insert')
    @ApiGetServiceDocs('coupon insert')
    async couponInsertController() {
        return await this.couponService.couponInsert();
    }

    @Get('/insert-redeem')
    @ApiGetServiceDocs('coupon insert redeem')
    async couponInsertRedeemController() {
        return await this.couponService.couponInsertRedeem();
    }

    @Get('/insert-undian')
    @ApiGetServiceDocs('coupon insert undian')
    async couponInsertUndianController() {
        return await this.couponService.couponInsertUndian();
    }

    @Get('/insert-csv')
    @ApiGetServiceDocs('coupon insert csv')
    async couponInsertCsvController() {
        return await this.couponService.couponInsertCsv();
    }

    @Get('/insert-excel')
    @ApiGetServiceDocs('coupon insert excel')
    async couponInsertExcelController() {
        return await this.couponService.couponInsertExcel();
    }

    @Get('/update')
    @ApiGetServiceDocs('coupon update')
    async couponUpdateController() {
        return await this.couponService.couponUpdate();
    }
}
