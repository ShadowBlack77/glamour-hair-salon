import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { FIREBASE_HELPER, FirebaseHelper } from '../utils/firebase-helper.utils';
import { Response } from 'express';
import { MailService } from 'src/feature/mail/repository/mail.service';

@Injectable()
export class AuthService {

  constructor(
    @InjectFirebaseAdmin() private readonly _firebase: FirebaseAdmin,
    @Inject(FIREBASE_HELPER) private readonly _firebaseHelper: FirebaseHelper,
    private readonly _mailService: MailService
  ) {}

  async signIn(res: Response, signInDto: any): Promise<any> {
    try {
      await this._firebaseHelper.signInWithEmailAndPassword(res, signInDto);

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
}
