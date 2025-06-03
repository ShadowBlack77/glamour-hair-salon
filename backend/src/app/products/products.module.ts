import { Module } from "@nestjs/common";
import { ProductController } from "./controller/product.controller";
import { ProductService } from "./repository/product.service";

@Module({
  controllers: [
    ProductController
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule {}