import { BadRequestException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Response } from "express";
import { FirebaseAdmin, InjectFirebaseAdmin } from "nestjs-firebase";
import { STRIPE_HELPER, StripeHelper } from "../utils/stripe-helper.utils";

@Injectable()
export class PaymentsService {

  constructor(
    @InjectFirebaseAdmin() private readonly _firebase: FirebaseAdmin,
    @Inject(STRIPE_HELPER) private readonly _stripeHelper: StripeHelper
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

      console.log(lineItems);

      return res.status(200).json({ content: 'Work' });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async checkoutSession(res: Response, userId: string, sessionRequest: any) {

  }
}