import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Response } from "express";
import { PaymentsService } from "../repository/payments.service";
import { findUserOrThrowError } from "src/core/auth/utils/find-user-or-throw-error";

@Controller({
  path: 'payments'
})
export class PaymentsController {

  constructor(private readonly _paymentsService: PaymentsService) {}

  @Post('/create-checkout-session')
  @HttpCode(HttpStatus.OK)
  createCheckoutSesison(@Res() res: Response, @Body() checkoutDto: any) {
    const userId = findUserOrThrowError(res);

    return this._paymentsService.createCheckoutSession(res, userId, checkoutDto);
  }

  @Post('/checkout-session')
  @HttpCode(HttpStatus.OK)
  public checkoutSuccess(@Res() res: Response, @Body() sessionDto: any) {
    const userId = findUserOrThrowError(res);

    return this._paymentsService.checkoutSession(res, userId, sessionDto);
  }
}