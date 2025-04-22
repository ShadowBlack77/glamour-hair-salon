import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

export const STRIPE_HELPER: string = 'STRIPE_HELPER';

@Injectable()
export class StripeHelper {

  private readonly stripe: Stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  async createSession(lineItems: any) {
    await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
    })
  }
}