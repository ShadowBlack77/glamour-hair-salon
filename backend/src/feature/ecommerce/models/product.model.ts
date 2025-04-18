export interface Product {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly price: number;
  readonly featured: boolean;
  readonly stockQuantity: number;
}