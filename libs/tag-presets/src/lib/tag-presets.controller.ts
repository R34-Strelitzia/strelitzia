import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, UserId } from '@strelitzia/auth';
import {
  CreatePreset,
  DeletePreset,
  FindAllPresets,
  UpdatePreset,
} from '@strelitzia/contracts/v2';

import { TagPresetsService } from './tag-presets.service';

@Controller()
export class TagPresetsController {
  constructor(private tagPresetsService: TagPresetsService) {}

  @Post(CreatePreset.path)
  @UseGuards(JwtAuthGuard)
  create(
    @UserId() userId: string,
    @Body() dto: CreatePreset.Request
  ): Promise<CreatePreset.Response> {
    return this.tagPresetsService.create(userId, dto);
  }

  @Get(FindAllPresets.path)
  @UseGuards(JwtAuthGuard)
  findAll(
    @UserId() userId: string,
    @Body() dto: FindAllPresets.Request
  ): Promise<FindAllPresets.Response> {
    return this.tagPresetsService.findAll(userId, dto);
  }

  @Put(UpdatePreset.path)
  @UseGuards(JwtAuthGuard)
  update(
    @UserId() userId: string,
    @Body() dto: UpdatePreset.Request
  ): Promise<UpdatePreset.Response> {
    return this.tagPresetsService.update(userId, dto);
  }

  @Delete(DeletePreset.path + ':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @UserId() userId: string,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<DeletePreset.Response> {
    return this.tagPresetsService.delete(userId, id);
  }
}
