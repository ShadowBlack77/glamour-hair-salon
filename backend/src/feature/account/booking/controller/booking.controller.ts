import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { BookingService } from "../repository/booking.service";
import { Response } from "express";
import { findUserOrThrowError } from "src/core/auth/utils/find-user-or-throw-error";

@Controller({
  path: 'booking'
})
export class BookingController {

  constructor(private readonly _bookingService: BookingService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  getByUserId(@Res() res: Response) {
    const userId = findUserOrThrowError(res);
    
    return this._bookingService.getByUserId(res, userId);
  }

  @Post('/save')
  @HttpCode(HttpStatus.CREATED)
  save(@Res() res: Response, @Body() bookingDto: any) {
    const userId = findUserOrThrowError(res);

    return this._bookingService.save(res, userId, bookingDto);
  }
}