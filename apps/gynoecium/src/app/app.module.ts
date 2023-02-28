import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@strelitzia/auth';
import { UsersModule } from '@strelitzia/users';
import { PrismaModule } from '@strelitzia/prisma';
import { FavoritesModule } from '@strelitzia/favorites';
import { TagPresetsModule } from '@strelitzia/tag-presets';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    FavoritesModule,
    TagPresetsModule,
    ConfigModule.forRoot({ cache: true, expandVariables: true }),
  ],
})
export class AppModule {}
