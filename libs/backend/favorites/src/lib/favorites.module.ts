import { Module } from '@nestjs/common';

import { AuthModule } from '@strelitzia/backend/auth';
import { PrismaModule } from '@strelitzia/backend/prisma';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
