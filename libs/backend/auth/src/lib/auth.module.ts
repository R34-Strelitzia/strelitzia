import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';

import { UsersModule } from '@strelitzia/backend/users';
import { PrismaModule } from '@strelitzia/backend/prisma';

import { AuthService } from './auth.service';
import { authenticationConfig } from './config';
import { AuthController } from './auth.controller';
import { PasswordService } from './password.service';
import { JwtStrategy, JwtRefreshStrategy } from './guards';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forFeature(authenticationConfig),
    JwtModule.registerAsync({
      imports: [...authenticationConfig.asProvider().imports],
      useFactory: (authConfig: ConfigType<typeof authenticationConfig>) => ({
        signOptions: { issuer: authConfig.issuer },
      }),
      inject: [...authenticationConfig.asProvider().inject],
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
