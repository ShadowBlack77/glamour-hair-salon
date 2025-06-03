import { Module } from "@nestjs/common";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./repository/auth.service";
import { FIREBASE_UTILS, FirebaseUtils } from "../firebase/firebase.utils";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guards/auth.guard";
import { MailService } from "../mail/repository/mail.service";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    MailService,
    {
      provide: FIREBASE_UTILS,
      useClass: FirebaseUtils
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AuthModule {}