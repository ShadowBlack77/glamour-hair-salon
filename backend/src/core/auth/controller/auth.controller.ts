import { Controller, Get, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../repository/auth.service';

@Controller({
  path: 'auth'
})
export class AuthController {

  constructor(private readonly _authService: AuthService) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile() {
    throw new UnauthorizedException();
  }
}
