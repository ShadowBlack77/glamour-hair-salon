import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Response } from "express";
import { FirebaseAdmin, InjectFirebaseAdmin } from "nestjs-firebase";
import * as adminFirebase from 'firebase-admin';

@Injectable()
export class BookingService {

  constructor(@InjectFirebaseAdmin() private readonly _firebase: FirebaseAdmin) {}

  async getByUserId(res: Response, userId: string) {
    try {
      const bookingDocRef = this._firebase.firestore.collection('bookings').doc(userId);
      const userBookingDoc = await bookingDocRef.get();

      if (!userBookingDoc.exists) {
        throw new NotFoundException('Booking not found');
      }

      const bookingDocData = userBookingDoc.data();

      return res.status(200).json({ content: bookingDocData });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async save(res: Response, userId: string, bookingDto: any) {
    try {
      const bookingDocRef = this._firebase.firestore.collection('bookings').doc(userId);

      await bookingDocRef.set({
        userId: userId,
        username: bookingDto.username,
        email: bookingDto.email,
        phoneNumber: bookingDto.phoneNumber,
        createdAt: adminFirebase.firestore.Timestamp.now()
      });

      const bookingDocData = (await bookingDocRef.get()).data();

      return res.status(201).json({ content: bookingDocData });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}