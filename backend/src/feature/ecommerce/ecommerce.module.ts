import { Module } from '@nestjs/common';
import { EcommerceController } from './controller/ecommerce.controller';
import { EcommerceService } from './repository/ecommerce.service';

@Module({
  controllers: [
    EcommerceController
  ],
  providers: [
    EcommerceService
  ]
})
export class EcommerceModule {}
