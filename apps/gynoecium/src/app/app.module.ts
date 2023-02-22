import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@strelitzia/auth';
import { UsersModule } from '@strelitzia/users';
import { PrismaModule } from '@strelitzia/prisma';
import { FavoritesModule } from '@strelitzia/favorites';
import { validate } from '@strelitzia/config-validation';
import { TagPresetsModule } from '@strelitzia/tag-presets';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    FavoritesModule,
    TagPresetsModule,
    PrismaModule,
    ConfigModule.forRoot({ cache: true, validate }),
  ],
})
export class AppModule {}
