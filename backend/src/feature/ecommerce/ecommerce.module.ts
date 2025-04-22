import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { CartModule } from './cart/cart.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ProductModule,
    CartModule,
    PaymentsModule
  ],
})
export class EcommerceModule {}
