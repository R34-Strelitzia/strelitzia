import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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

@Controller({ version: '2' })
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post(AddFavorite.path + ':id')
  @UseGuards(JwtAuthGuard)
  add(
    @UserId() userId: string,
    @Param('id', ParseIntPipe) postId: number
  ): Promise<AddFavorite.Response> {
    return this.favoritesService.add(userId, postId);
  }

  @Get(FindAllFavorite.path)
  @UseGuards(JwtAuthGuard)
  findAll(
    @UserId() userId: string,
    @Body() findAllFavoritesDTO: FindAllFavorite.Request
  ): Promise<FindAllFavorite.Response> {
    return this.favoritesService.findAll(userId, findAllFavoritesDTO);
  }

  @Delete(RemoveFavorite.path + ':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @UserId() userId: string,
    @Param('id', ParseIntPipe) postId: number
  ): Promise<RemoveFavorite.Response> {
    return this.favoritesService.remove(userId, postId);
  }
}
