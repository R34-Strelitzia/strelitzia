import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@strelitzia/auth';
import { UsersModule } from '@strelitzia/users';
import { PrismaModule } from '@strelitzia/prisma';
import { FavoritesModule } from '@strelitzia/favorites';
import { validate } from '@strelitzia/config-validation';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    FavoritesModule,
    PrismaModule,
    ConfigModule.forRoot({ cache: true, validate }),
  ],
})
export class AppModule {}
