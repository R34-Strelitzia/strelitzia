import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginLocal, RefreshJwt, SignUpLocal } from '@strelitzia/contracts/v2';

import { UserId } from './decorators';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignUpLocal.Request): Promise<SignUpLocal.Response> {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginLocal.Request): Promise<LoginLocal.Response> {
    return this.authService.login(dto);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh')
  refresh(@UserId() userId: string): Promise<RefreshJwt.Response> {
    return this.authService.refresh(userId);
  }
}
