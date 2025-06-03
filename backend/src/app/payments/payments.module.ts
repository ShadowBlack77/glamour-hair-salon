import { Module } from "@nestjs/common";
import { PaymentsController } from "./controller/payments.controller";
import { PaymentsService } from "./repository/payments.service";
import { STRIPE_HELPER, StripeHelper } from "./utils/stripe-helper.utils";
import { MailService } from "src/app/mail/repository/mail.service";

@Module({
  controllers: [
    PaymentsController
  ],
  providers: [
    PaymentsService,
    {
      provide: STRIPE_HELPER,
      useClass: StripeHelper
    },
    MailService
  ]
})
export class PaymentsModule {}