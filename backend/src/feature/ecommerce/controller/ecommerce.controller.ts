import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UnauthorizedException } from "@nestjs/common";
import { EcommerceService } from "../repository/ecommerce.service";
import { Public } from "src/core/auth/decorators/public.decorator";
import { Response } from "express";
import { findUserOrThrowError } from "src/core/auth/utils/find-user-or-throw-error";

@Controller({
  path: 'ecommerce'
})
export class EcommerceController {
  
  constructor(private readonly _ecommerceService: EcommerceService) {}

  @Public()
  @Get('all-products')
  @HttpCode(HttpStatus.OK)
  getAllProducts() {
    return this._ecommerceService.getAllProducts();
  }

  @Get('cart')
  @HttpCode(HttpStatus.OK)
  getCart(@Res() res: Response) {
    const userId = findUserOrThrowError(res);

    return this._ecommerceService.getCart(res, userId)
  }

  @Post('add-to-cart')
  @HttpCode(HttpStatus.OK)
  addToCart(@Res() res: Response, @Body() productDto: any) {
    const userId = findUserOrThrowError(res);

    return this._ecommerceService.addToCart(res, userId, productDto);
  }
}