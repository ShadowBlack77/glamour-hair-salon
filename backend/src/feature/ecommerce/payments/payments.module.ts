import { Module } from "@nestjs/common";
import { PaymentsController } from "./controller/payments.controller";
import { PaymentsService } from "./repository/payments.service";
import { STRIPE_HELPER, StripeHelper } from "./utils/stripe-helper.utils";

@Module({
  controllers: [
    PaymentsController
  ],
  providers: [
    PaymentsService,
    {
      provide: STRIPE_HELPER,
      useClass: StripeHelper
    }
  ]
})
export class PaymentsModule {}