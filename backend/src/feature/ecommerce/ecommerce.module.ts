import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ProductModule,
    CartModule
  ],
})
export class EcommerceModule {}
