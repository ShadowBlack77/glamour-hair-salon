import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

export const STRIPE_HELPER: string = 'STRIPE_HELPER';

@Injectable()
export class StripeHelper {

  private readonly stripe: Stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  async createSession(userId: string, lineItems: any, products: any): Promise<any> {
    return await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/purchase-cancel`,
      metadata: {
        userId: userId,
        products: JSON.stringify(
          products.map((p: any) => ({
            id: p.id,
            quantity: p.quantity,
            price: p.price
          }))
        )
      }
    })
  }

  async checkoutSession(sessionId: string): Promise<any> {
    return await this.stripe.checkout.sessions.retrieve(sessionId);
  }
}