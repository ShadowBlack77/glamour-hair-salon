import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { EcommerceService } from "../repository/ecommerce.service";

@Controller({
  path: 'ecommerce'
})
export class EcommerceController {
  
  constructor(private readonly _ecommerceService: EcommerceService) {}

  @Get('all-products')
  @HttpCode(HttpStatus.OK)
  getAllProducts() {
    return this._ecommerceService.getAllProducts();
  }
}