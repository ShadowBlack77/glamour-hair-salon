import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { Response } from 'express';
import { FIREBASE_UTILS, FirebaseUtils } from 'src/app/firebase/firebase.utils';
import { MailService } from 'src/app/mail/repository/mail.service';

@Injectable()
export class AuthService {

  constructor(
    @InjectFirebaseAdmin() private readonly _firebase: FirebaseAdmin,
    @Inject(FIREBASE_UTILS) private readonly _firebaseUtils: FirebaseUtils,
    private readonly _mailService: MailService
  ) {}

  async signIn(res: Response, signInDto: any): Promise<any> {
    try {
      const { accessToken, refreshToken } = await this._firebaseUtils.signInWithEmailAndPassword(res, signInDto);

      await this.setAccessTokenCookie(res, accessToken);
      await this.setRefreshTokenCookie(res, refreshToken);

      return res.status(200).json({ content: 'logged in' });
    } catch (error) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  async signUp(res: Response, signUpDto: any): Promise<any> {
    try {
      const createdUser = await this._firebase.auth.createUser({
        email: signUpDto.email,
        password: signUpDto.password,
      });
  
      const userRef = this._firebase.firestore.collection('users').doc(createdUser.uid);
      const userDoc = await userRef.get();
  
      if (!userDoc.exists) {
        await userRef.create({
          uid: createdUser.uid,
          username: signUpDto.username,
          role: 'user'
        });
      }
  
      return res.status(201).json({ content: 'account created' });
    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }

  async signOut(res: Response): Promise<any> {

    if (!res.locals.user) {
      throw new UnauthorizedException('User was not logged in');
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return res.status(200).json({ content: 'logged out' });
  }

  async getProfile(userId: string): Promise<any> {
    const user = await this._firebase.auth.getUser(userId);

    const userRoleDoc = await this._firebase.firestore.doc(`users/${userId}`).get();
    const userRoleData = userRoleDoc.data();
    
    return {
      uid: user.uid,
      email: user.email,
      username: userRoleData!['username'],
      role: userRoleData!['role']
    };
  }

  async verifyIdToken(accessToken: string) {
    const decodedToken = await this._firebase.auth.verifyIdToken(accessToken);

    return decodedToken;
  }

  async resetPassword(resetPasswordDto: any) {
    const { email } = resetPasswordDto;

    const resetLink = await this._firebase.auth.generatePasswordResetLink(email);

    this._mailService.sendMail(email, 'Reset Password', 'reset-password', { link: resetLink });

    return { content: 'Email sended' };
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
