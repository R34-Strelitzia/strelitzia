import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';

import { UserId } from './decorators';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './guards';
import { API_TAGS } from '@strelitzia/backend/swagger';
import { LoginLocal, RefreshJwt, SignUpLocal } from '@strelitzia/contracts/v2';

@ApiTags(API_TAGS.AUTH)
@Controller({ version: '2' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, type: SignUpLocal.Response })
  @ApiException(() => BadRequestException, { description: 'validation error' })
  @ApiException(() => ConflictException, {
    description: 'email or username already taken',
  })
  @Post(SignUpLocal.path)
  signup(
    @Body() signUpDTO: SignUpLocal.Request,
  ): Promise<SignUpLocal.Response> {
    return this.authService.signup(signUpDTO);
  }

  @ApiResponse({ status: 200, type: LoginLocal.Response })
  @ApiException(() => BadRequestException, { description: 'validation error' })
  @ApiException(() => UnauthorizedException, {
    description: 'incorrect credentials',
  })
  @Post(LoginLocal.path)
  @HttpCode(200)
  login(@Body() loginDTO: LoginLocal.Request): Promise<LoginLocal.Response> {
    return this.authService.login(loginDTO);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: RefreshJwt.Response })
  @ApiException(() => UnauthorizedException, {
    description: 'token expired or invalid',
  })
  @Get(RefreshJwt.path)
  @UseGuards(JwtRefreshAuthGuard)
  refresh(@UserId() userId: string): Promise<RefreshJwt.Response> {
    return this.authService.refresh(userId);
  }
}
