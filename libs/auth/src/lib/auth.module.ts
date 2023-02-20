import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { UsersModule } from '@strelitzia/users';
import { PrismaModule } from '@strelitzia/prisma';
import { AuthController } from './auth.controller';
import { PasswordService } from './password.service';
import { JwtStrategy, JwtRefreshStrategy } from './guards';
import { EnvironmentVariables } from '@strelitzia/config-validation';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        signOptions: { issuer: configService.get('JWT_ISSUER') },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
