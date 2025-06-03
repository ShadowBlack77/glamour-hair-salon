import { Response } from "express";
import axios from 'axios';
import { Injectable } from "@nestjs/common";

export const FIREBASE_UTILS: string = 'FIREBASE_UTILS';

@Injectable()
export class FirebaseUtils {

  async signInWithEmailAndPassword(res: Response, signInDto: any): Promise<{ accessToken: string, refreshToken: string }> {
    try {
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
        email: signInDto.email,
        password: signInDto.password,
        returnSecureToken: true
      });
  
      const data = await response.data;

      return { accessToken: data.idToken, refreshToken: data.refreshToken }
    } catch (error) {
      throw new Error(error);
    }
  }

  async refreshToken(res: Response, refreshToken: string): Promise<{ accessToken: string }> {
    const refreshResponse = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`, {
      grant_type: "refresh_token",
      refresh_token: refreshToken
    });

    return { accessToken: refreshResponse.data['id_token'] }
  }
}