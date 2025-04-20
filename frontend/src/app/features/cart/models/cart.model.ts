export interface CartItem {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly price: number;
  readonly quantity: number;
}

export interface Cart {
  readonly userId: string;
  readonly items: CartItem[];
  readonly totalPrice: number;
  readonly totalQuantity: number;
  readonly currency: string;
  readonly updatedAt: any;
}