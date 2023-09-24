import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, UserId } from '@strelitzia/auth';
import {
  CreatePreset,
  DeletePreset,
  FindAllPresets,
  FindOnePresets,
  UpdatePreset,
} from '@strelitzia/contracts/v2';

import { TagPresetsService } from './tag-presets.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { API_AUTH, API_TAGS } from '@strelitzia/backend/swagger';

@ApiTags(API_TAGS.TAG_PRESET)
@ApiBearerAuth(API_AUTH.JWT_ACCESS)
@UseGuards(JwtAuthGuard)
@Controller({ version: '2' })
export class TagPresetsController {
  constructor(private tagPresetsService: TagPresetsService) {}

  @ApiResponse({ status: HttpStatus.CREATED, type: CreatePreset.Response })
  @ApiException(() => BadRequestException, { description: 'Validation error' })
  @ApiException(() => UnauthorizedException, { description: 'Unauthorized' })
  @ApiException(() => ConflictException, { description: 'Conflict error' })
  @Post(CreatePreset.path)
  create(
    @UserId() userId: string,
    @Body() createPresetDTO: CreatePreset.Request,
  ): Promise<CreatePreset.Response> {
    return this.tagPresetsService.create(userId, createPresetDTO);
  }

  @ApiOkResponse({ type: FindAllPresets.Response })
  @ApiException(() => BadRequestException, { description: 'Validation error' })
  @ApiException(() => UnauthorizedException, { description: 'Unauthorized' })
  @ApiException(() => NotFoundException, { description: 'Not found' })
  @Get(FindAllPresets.path)
  findAll(
    @UserId() userId: string,
    @Body() findAllPresetsDTO: FindAllPresets.Request,
  ): Promise<FindAllPresets.Response> {
    return this.tagPresetsService.findAll(userId, findAllPresetsDTO);
  }

  @ApiOkResponse({ type: FindOnePresets.Response })
  @ApiException(() => BadRequestException, { description: 'Validation error' })
  @ApiException(() => UnauthorizedException, { description: 'Unauthorized' })
  @ApiException(() => NotFoundException, { description: 'Not found' })
  @Get(FindOnePresets.path + ':id')
  findOne(
    @UserId() userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<FindOnePresets.Response> {
    return this.tagPresetsService.findOne(userId, id);
  }

  @ApiOkResponse({ type: UpdatePreset.Response })
  @ApiException(() => BadRequestException, { description: 'Validation error' })
  @ApiException(() => UnauthorizedException, { description: 'Unauthorized' })
  @ApiException(() => NotFoundException, { description: 'Not found' })
  @Patch(UpdatePreset.path + ':id')
  update(
    @UserId() userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePresetDTO: UpdatePreset.Request,
  ): Promise<UpdatePreset.Response> {
    return this.tagPresetsService.update(userId, id, updatePresetDTO);
  }

  @ApiOkResponse({ status: HttpStatus.NO_CONTENT })
  @ApiException(() => BadRequestException, { description: 'Validation error' })
  @ApiException(() => UnauthorizedException, { description: 'Unauthorized' })
  @ApiException(() => NotFoundException, { description: 'Not found' })
  @Delete(DeletePreset.path + ':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @UserId() userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DeletePreset.Response> {
    return this.tagPresetsService.delete(userId, id);
  }
}
