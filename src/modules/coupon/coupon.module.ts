import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { MongoDbModule } from '@datasource/mongo-db/mongo-db.module';
import { ProjectDbModule } from '@datasource/project-db/project-db.module';
import { CouponInsertConsumer, CouponUpdateConsumer } from './consumer/coupon.consumer';

@Module({
    imports: [MongoDbModule, ProjectDbModule, BullModule.registerQueue({ name: 'coupon-insert' }, { name: 'coupon-update' })],
    controllers: [CouponController],
    providers: [CouponService, CouponInsertConsumer, CouponUpdateConsumer],
})
export class CouponModule {}
