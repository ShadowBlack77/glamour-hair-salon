import { Response } from "express";
import axios from 'axios';
import { Injectable } from "@nestjs/common";

// Create Token of Firebase Helper Class
export const FIREBASE_HELPER: string = 'FIREBASE_HELPER';

/* 
  For working this class you need to install:
    - axios
    - nestjs-firebase
    - firebase 
    - firebase-admin
    - cookie-parser
    - @nestjs/config

  Currently verios of Helper includes:
    - signInWithEmailAndPassword
    - refresh token functionality
    - set access & refresh token cookies

  // TODOS:
    - Return only access token for saving it in localstorage on client side
    - Return only refresh token for saving it in localstorage on client side
*/

@Injectable()
export class FirebaseHelper {

  async signInWithEmailAndPassword(res: Response, signInDto: any): Promise<void> {
    try {
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
        email: signInDto.email,
        password: signInDto.password,
        returnSecureToken: true
      });
  
      const data = await response.data;
  
      await this.setAccessTokenCookie(res, data.idToken);
      await this.setRefreshTokenCookie(res, data.refreshToken);
    } catch (error) {
      throw new Error(error);
    }
  }

  async refreshToken(res: Response, refreshToken: string) {
    const refreshResponse = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`, {
      grant_type: "refresh_token",
      refresh_token: refreshToken
    });

    this.setAccessTokenCookie(res, refreshResponse.data['id_token']);

    return refreshResponse.data['id_token'];
  }

  async setAccessTokenCookie(res: Response, accessToken: string) {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
  }

  async setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
  }
}