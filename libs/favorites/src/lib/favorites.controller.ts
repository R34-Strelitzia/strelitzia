import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  AddFavorite,
  FindAllFavorite,
  RemoveFavorite,
} from '@strelitzia/contracts/v2';
import { JwtAuthGuard, UserId } from '@strelitzia/auth';

import { FavoritesService } from './favorites.service';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';

@Controller({ version: '2' })
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @ApiResponse({ status: HttpStatus.CREATED, type: AddFavorite.Response })
  @ApiException(() => BadRequestException, { description: 'Validation error' })
  @ApiException(() => ForbiddenException, { description: 'Resource Forbidden' })
  @ApiException(() => ConflictException, {
    description: 'Already in favorites',
  })
  @Post(AddFavorite.path + ':id')
  @UseGuards(JwtAuthGuard)
  add(
    @UserId() userId: string,
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<AddFavorite.Response> {
    return this.favoritesService.add(userId, postId);
  }

  @ApiOkResponse({ type: FindAllFavorite.Response })
  @ApiException(() => BadRequestException, { description: 'Validation error' })
  @ApiException(() => ForbiddenException, { description: 'Resource Forbidden' })
  @ApiException(() => NotFoundException, {
    description: 'Favorites not found',
  })
  @Get(FindAllFavorite.path)
  @UseGuards(JwtAuthGuard)
  findAll(
    @UserId() userId: string,
    @Body() findAllFavoritesDTO: FindAllFavorite.Request,
  ): Promise<FindAllFavorite.Response> {
    return this.favoritesService.findAll(userId, findAllFavoritesDTO);
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiException(() => BadRequestException, { description: 'Validation error' })
  @ApiException(() => ForbiddenException, { description: 'Resource Forbidden' })
  @ApiException(() => NotFoundException, { description: 'Favorites not found' })
  @Delete(RemoveFavorite.path + ':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @UserId() userId: string,
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<RemoveFavorite.Response> {
    return this.favoritesService.remove(userId, postId);
  }
}
