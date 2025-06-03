import { Module } from "@nestjs/common";
import { BookingController } from "./controller/booking.controller";
import { BookingService } from "./repository/booking.service";

@Module({
  controllers: [
    BookingController
  ],
  providers: [
    BookingService
  ]
})
export class BookingModule {}