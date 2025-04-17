import { Module } from '@nestjs/common';
import { EcommerceModule } from './ecommerce/ecommerce.module';

@Module({
  imports: [EcommerceModule]
})
export class FeatureModule {}
