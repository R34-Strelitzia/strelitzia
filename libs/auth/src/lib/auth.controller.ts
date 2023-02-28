import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginLocal, RefreshJwt, SignUpLocal } from '@strelitzia/contracts/v2';

import { UserId } from './decorators';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './guards';

@Controller({ version: '2' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(SignUpLocal.path)
  signup(
    @Body() signUpDTO: SignUpLocal.Request
  ): Promise<SignUpLocal.Response> {
    return this.authService.signup(signUpDTO);
  }

  @Post(LoginLocal.path)
  login(@Body() loginDTO: LoginLocal.Request): Promise<LoginLocal.Response> {
    return this.authService.login(loginDTO);
  }

  @Get(RefreshJwt.path)
  @UseGuards(JwtRefreshAuthGuard)
  refresh(@UserId() userId: string): Promise<RefreshJwt.Response> {
    return this.authService.refresh(userId);
  }
}
