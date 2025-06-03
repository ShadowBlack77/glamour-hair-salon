import { CartItem } from "./cart-item.model";

export interface Cart {
  readonly userId: string;
  readonly items: CartItem[];
  readonly totalPrice: number;
  readonly totalQuantity: number;
  readonly currency: string;
  readonly updatedAt: any;
}