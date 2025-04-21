import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { CartService } from "../repository/cart.service";
import { Response } from "express";
import { findUserOrThrowError } from "src/core/auth/utils/find-user-or-throw-error";

@Controller({
  path: 'cart'
})
export class CartController {

  constructor(private readonly _cartService: CartService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  get(@Res() res: Response) {
    const userId = findUserOrThrowError(res);

    return this._cartService.getCart(res, userId);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  add(@Res() res: Response, @Body() productDto: any) {
    const userId = findUserOrThrowError(res);

    return this._cartService.addToCart(res, userId, productDto)
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  update(@Res() res: Response, @Param('id') id: string, @Body() quantityDto: any) {
    const userId = findUserOrThrowError(res);

    return this._cartService.update(res, userId, id, quantityDto);
  }
}