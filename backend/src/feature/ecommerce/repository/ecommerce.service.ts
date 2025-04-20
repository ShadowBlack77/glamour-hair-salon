import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Response } from "express";
import { FirebaseAdmin, InjectFirebaseAdmin } from "nestjs-firebase";
import * as admin from 'firebase-admin';

@Injectable()
export class EcommerceService {
  
  constructor(@InjectFirebaseAdmin() private readonly _firebase: FirebaseAdmin) {}

  async getAllProducts(): Promise<any> {
    try { 
      const productsSnapshot = await this._firebase.firestore.collection('products').get();

      const products = productsSnapshot.docs.flatMap((doc) => doc.data());

      return products;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getCart(res: Response, userId: string): Promise<any> {
    try {
      const cartDocRef = this._firebase.firestore.collection('cart').doc(userId);

      if (!(await cartDocRef.get()).exists) {
        await cartDocRef.set({
          userId: userId,
          items: [],
          totalPrice: 0,
          totalQuantity: 0,
          currency: 'USD',
          updatedAt: new Date()
        })
      }

      const cartDoc = await cartDocRef.get();
      const cartDocData = cartDoc.data();

      return res.status(200).json({ content: cartDocData });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async addToCart(res: Response, userId: string, product: any) {
    try {
      const firestore = this._firebase.firestore;
      const cartDocRef = firestore.collection('cart').doc(userId);

      await firestore.runTransaction(async (tx) => {
        const cartSnap = await tx.get(cartDocRef);

        const currentCart = cartSnap.exists ? 
          cartSnap.data() : 
          {
            userId,
            items: [],
            totalQuantity: 0,
            totalPrice: 0,
            currency: 'USD',
          };

        const exists = currentCart!.items.find((item: any) => item.id === product.id);
        const updatedItems = exists ? 
          currentCart!.items.map((item: any) => {
            return item.id === product.id ? 
              { ...item, quantity: item.quantity + 1 } : 
              item
          }) : 
            [
              ...currentCart!.items,
              {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: 1
              }
            ];

        const totalQuantity = updatedItems.reduce((sum: any, i: any) => sum + i.quantity, 0);
        const totalPrice = updatedItems.reduce((sum: any, i: any) => sum + i.price * i.quantity, 0);

        const updatedCart = {
          ...currentCart,
          items: updatedItems,
          totalQuantity,
          totalPrice,
          updatedAt: admin.firestore.Timestamp.now()
        };

        tx.set(cartDocRef, updatedCart, { merge: true });
      });

      return res.status(200).json({ content: 'Product added successfully' });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}