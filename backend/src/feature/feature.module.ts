import { Module } from '@nestjs/common';
import { EcommerceModule } from './ecommerce/ecommerce.module';
import { BookingModule } from './account/booking/booking.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    EcommerceModule,
    BookingModule,
    MailModule
  ]
})
export class FeatureModule {}
