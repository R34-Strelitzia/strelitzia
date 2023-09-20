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
import { LoginLocalDTO } from './dto/login-local.dto';
import { SignUpLocalDTO } from './dto/signup-local.dto';
import { LoginLocal, RefreshJwt, SignUpLocal } from '@strelitzia/contracts/v2';
import { AuthResponseDTO } from './dto/auth-response.dto';

@ApiTags(API_TAGS.AUTH)
@Controller({ version: '2' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, type: AuthResponseDTO })
  @ApiException(() => BadRequestException, { description: 'validation error' })
  @ApiException(() => ConflictException, {
    description: 'email or username already taken',
  })
  @Post(SignUpLocal.path)
  signup(@Body() signUpDTO: SignUpLocalDTO): Promise<AuthResponseDTO> {
    return this.authService.signup(signUpDTO);
  }

  @ApiResponse({ status: 200, type: AuthResponseDTO })
  @ApiException(() => BadRequestException, { description: 'validation error' })
  @ApiException(() => UnauthorizedException, {
    description: 'incorrect credentials',
  })
  @Post(LoginLocal.path)
  @HttpCode(200)
  login(@Body() loginDTO: LoginLocalDTO): Promise<AuthResponseDTO> {
    return this.authService.login(loginDTO);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: AuthResponseDTO })
  @ApiException(() => UnauthorizedException, {
    description: 'token expired or invalid',
  })
  @Get(RefreshJwt.path)
  @UseGuards(JwtRefreshAuthGuard)
  refresh(@UserId() userId: string): Promise<AuthResponseDTO> {
    return this.authService.refresh(userId);
  }
}
