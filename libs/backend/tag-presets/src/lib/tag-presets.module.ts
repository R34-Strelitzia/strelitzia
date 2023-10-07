import { Module } from '@nestjs/common';

import { AuthModule } from '@strelitzia/backend/auth';
import { PrismaModule } from '@strelitzia/backend/prisma';

import { TagPresetsService } from './tag-presets.service';
import { TagPresetsController } from './tag-presets.controller';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [TagPresetsController],
  providers: [TagPresetsService],
})
export class TagPresetsModule {}
