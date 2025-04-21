import { Module } from "@nestjs/common";
import { CartService } from "./repository/cart.service";
import { CartController } from "./controller/cart.controller";

@Module({
  controllers: [
    CartController
  ],
  providers: [
    CartService
  ]
})
export class CartModule {}