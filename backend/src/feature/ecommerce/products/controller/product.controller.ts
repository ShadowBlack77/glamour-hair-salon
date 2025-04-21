import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ProductService } from "../repository/product.service";
import { Public } from "src/core/auth/decorators/public.decorator";

@Controller({
  path: 'products'
})
export class ProductController {

  constructor(private readonly _productService: ProductService) {}

  @Public()
  @Get('/')
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this._productService.getAllProducts();
  }
}