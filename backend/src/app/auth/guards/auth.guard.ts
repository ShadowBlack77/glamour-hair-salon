import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../repository/auth.service";
import { Reflector } from "@nestjs/core";
import { Request, Response } from "express";
import { PUBLIC_TOKEN } from "../decorators/public.decorator";
import { FIREBASE_UTILS, FirebaseUtils } from "src/app/firebase/firebase.utils";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    @Inject(FIREBASE_UTILS) private readonly _firebaseUtils: FirebaseUtils,
    private readonly _authService: AuthService, 
    private readonly _reflecotr: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    if (request.headers['x-api-key'] !== process.env.API_KEY) {
      return false;
    }

    const isPublic = this._reflecotr.getAllAndOverride<boolean>(PUBLIC_TOKEN, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) {
      return true;
    }

    const { accessToken, refreshToken } = request.cookies;

    try {
      if (!accessToken) {
        throw new UnauthorizedException('No token provided');
      }

      const decodedToken = await this._authService.verifyIdToken(accessToken);
      const user = await this._authService.getProfile(decodedToken.uid);

      response.locals.user = {
        ...user
      }

      return true;
    } catch(error) {
      console.log(error);
      if (!refreshToken) {
        throw new UnauthorizedException('No token provided');
      }

      try {
        const { accessToken } = await this._firebaseUtils.refreshToken(response, refreshToken);

        await this._authService.setAccessTokenCookie(response, accessToken);

        const decodedToken = await this._authService.verifyIdToken(accessToken);
        const user = await this._authService.getProfile(decodedToken.uid);

        response.locals.user = {
          ...user
        }
        
        return true;
      } catch (error) {
        return false;
      }
    }
  }
}