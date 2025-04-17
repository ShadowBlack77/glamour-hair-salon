import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../repository/auth.service';

@Controller({
  path: 'auth'
})
export class AuthController {

  constructor(private readonly _authService: AuthService) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile() {
    return { user: { id: '1', email: 'a@a.com', role: 'user' } };
  }
}
