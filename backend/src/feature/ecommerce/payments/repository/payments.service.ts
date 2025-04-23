import { BadRequestException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Response } from "express";
import { FirebaseAdmin, InjectFirebaseAdmin } from "nestjs-firebase";
import { STRIPE_HELPER, StripeHelper } from "../utils/stripe-helper.utils";
import * as adminFirebase from 'firebase-admin';
import { MailService } from "src/feature/mail/repository/mail.service";

@Injectable()
export class PaymentsService {

  constructor(
    @InjectFirebaseAdmin() private readonly _firebase: FirebaseAdmin,
    @Inject(STRIPE_HELPER) private readonly _stripeHelper: StripeHelper,
    private readonly _mailService: MailService
  ) {}

  async createCheckoutSession(res: Response, userId: string, checkoutDto: any) {
    try {
      const { products } = checkoutDto;

      if (!Array.isArray(products) || products.length === 0) {
        throw new BadRequestException('Invalid or empty products array')
      }
      
      let totalAmount: number = 0;

      const lineItems = products.map((product) => {
        const amount = Math.round(product.price * 100);

        totalAmount += amount * product.quantity;

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              images: [product.imageUrl]
            },
            unit_amount: amount
          },
          quantity: product.quantity || 1
        }
      });

      const session: any = await this._stripeHelper.createSession(userId, lineItems, products);

      return res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async checkoutSession(res: Response, userId: string, sessionRequest: any) {
    try {
      const { sessionId } = sessionRequest;
      const session = await this._stripeHelper.checkoutSession(sessionId);

      if (session.payment_status === 'paid') {

        const existingSessionQuery = await this._firebase.firestore.collection('orders')
          .where('sessionId', '==', session.id)
          .limit(1)
          .get();
        
        if (!existingSessionQuery.empty) {
          throw new BadRequestException('Session already processed');
        }

        const ordersDocRef = this._firebase.firestore.collection('orders').doc();
        const cartDocRef = this._firebase.firestore.collection('cart').doc(userId);
        const cartSnapshot = await cartDocRef.get();
        const cartData = cartSnapshot.data();


        const products = JSON.parse(session.metadata!.products);

        await ordersDocRef.set({
          userId: userId,
          sessionId: session.id,
          cart: products,
          totalAmount: session.amount_total / 100,
          createdAt: adminFirebase.firestore.Timestamp.now()
        });

        this._mailService.sendMail(session.customer_details.email, 'Purchased Completed', 'purchase-completed', { orderId: ordersDocRef.id });

        await cartDocRef.set({
          ...cartData,
          items: []
        });
      }

      return res.status(200).json({ content: 'Thanks for shopping!' });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}