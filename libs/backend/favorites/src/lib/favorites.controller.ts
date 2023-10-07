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
  ParseIntPipe,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';

import {
  AddFavorite,
  FindAllFavorite,
  RemoveFavorite,
} from '@strelitzia/contracts/v2';
import { JwtAuthGuard, UserId } from '@strelitzia/backend/auth';
import { API_AUTH, API_TAGS } from '@strelitzia/backend/swagger';

import { FavoritesService } from './favorites.service';

@ApiTags(API_TAGS.FAVORITES)
@ApiBearerAuth(API_AUTH.JWT_ACCESS)
@UseGuards(JwtAuthGuard)
@Controller({ version: '2' })
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @ApiResponse({ status: HttpStatus.CREATED, type: AddFavorite.Response })
  @ApiException(() => BadRequestException, { description: 'Validation error' })
  @ApiException(() => UnauthorizedException, { description: 'Unauthorized' })
  @ApiException(() => ConflictException, {
    description: 'Already in favorites',
  })
  @Post(AddFavorite.path)
  add(
    @UserId() userId: string,
    @Body() addFavoriteDto: AddFavorite.Request,
  ): Promise<AddFavorite.Response> {
    return this.favoritesService.add(userId, addFavoriteDto.favorite.postId);
  }

  @ApiOkResponse({ type: FindAllFavorite.Response })
  @ApiException(() => BadRequestException, { description: 'Validation error' })
  @ApiException(() => UnauthorizedException, { description: 'Unauthorized' })
  @Get(FindAllFavorite.path)
  findAll(
    @UserId() userId: string,
    @Query() findAllFavoritesDTO: FindAllFavorite.Request,
  ): Promise<FindAllFavorite.Response> {
    return this.favoritesService.findAll(userId, findAllFavoritesDTO);
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiException(() => BadRequestException, { description: 'Validation error' })
  @ApiException(() => UnauthorizedException, { description: 'Unauthorized' })
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
