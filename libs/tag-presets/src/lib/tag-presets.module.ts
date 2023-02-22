import { Module } from '@nestjs/common';

import { TagPresetsService } from './tag-presets.service';
import { TagPresetsController } from './tag-presets.controller';

@Module({
  controllers: [TagPresetsController],
  providers: [TagPresetsService],
})
export class TagPresetsModule {}
