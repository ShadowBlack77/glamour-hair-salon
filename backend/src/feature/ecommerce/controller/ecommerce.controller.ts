import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { EcommerceService } from "../repository/ecommerce.service";
import { Public } from "src/core/auth/decorators/public.decorator";

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
}