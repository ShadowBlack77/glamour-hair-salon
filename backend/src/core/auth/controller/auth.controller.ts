import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../repository/auth.service';
import { Response } from 'express';
import { Public } from '../decorators/public.decorator';

@Controller({
  path: 'auth'
})
export class AuthController {

  constructor(private readonly _authService: AuthService) {}

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Res() res: Response, @Body() signInDto: any): Promise<void> {
    return this._authService.signIn(res, signInDto);
  }

  @Public()
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Res() res: Response, @Body() signUpDto: any): Promise<void> {
    return this._authService.signUp(res, signUpDto);
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  signOut(@Res() res: Response): Promise<void> {
    return this._authService.signOut(res);
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Res() res: Response) {
    if (!res.locals.user) {
      throw new UnauthorizedException();
    }

    return res.status(200).json({ content: res.locals.user });
  }

  @Public()
  @Post('/reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() resetPasswordDto: any) {
    return this._authService.resetPassword(resetPasswordDto);
  }
}
