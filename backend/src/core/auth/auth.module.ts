import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './repository/auth.service';
import { FIREBASE_HELPER, FirebaseHelper } from './utils/firebase-helper.utils';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { MailService } from 'src/feature/mail/repository/mail.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: FIREBASE_HELPER,
      useClass: FirebaseHelper
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    MailService
  ]
})
export class AuthModule {}
