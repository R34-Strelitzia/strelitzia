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
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  AddFavorite,
  FindAllFavorite,
  RemoveFavorite,
} from '@strelitzia/contracts/v2';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';

import { FavoritesService } from './favorites.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { API_AUTH, API_TAGS } from '@strelitzia/backend/swagger';
import { JwtAuthGuard, UserId } from '@strelitzia/auth';

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
  @Post(AddFavorite.path + ':id')
  add(
    @UserId() userId: string,
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<AddFavorite.Response> {
    return this.favoritesService.add(userId, postId);
  }

  @ApiOkResponse({ type: FindAllFavorite.Response })
  @ApiException(() => BadRequestException, { description: 'Validation error' })
  @ApiException(() => UnauthorizedException, { description: 'Unauthorized' })
  @ApiException(() => NotFoundException, {
    description: 'Favorites not found',
  })
  @Get(FindAllFavorite.path)
  findAll(
    @UserId() userId: string,
    @Body() findAllFavoritesDTO: FindAllFavorite.Request,
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
