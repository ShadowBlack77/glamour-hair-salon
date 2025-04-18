import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { FirebaseAdmin, InjectFirebaseAdmin } from "nestjs-firebase";

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
}