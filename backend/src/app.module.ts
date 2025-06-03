import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { FirebaseModule } from 'nestjs-firebase';
import { AuthModule } from './app/auth/auth.module';
import { MailModule } from './app/mail/mail.module';
import { BookingModule } from './app/booking/booking.module';
import { ProductModule } from './app/products/products.module';
import { CartModule } from './app/cart/cart.module';
import { PaymentsModule } from './app/payments/payments.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '/assets/secrets/.env'),
      isGlobal: true
    }),
    FirebaseModule.forRoot({
      googleApplicationCredential: join(__dirname, `/assets/secrets/${process.env.FIREBASE_CONFIG_FILE}`)
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../glamour/frontend/browser')
    }),
    AuthModule,
    MailModule,
    BookingModule,
    ProductModule,
    CartModule,
    PaymentsModule
  ],
})
export class AppModule {}
