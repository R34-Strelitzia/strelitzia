import { Injectable } from '@nestjs/common';

import {
  AddFavorite,
  FindAllFavorite,
  RemoveFavorite,
} from '@strelitzia/contracts/v2';
import { PrismaService } from '@strelitzia/backend/prisma';

@Injectable()
export class FavoritesService {
  constructor(private readonly prismaService: PrismaService) {}

  async add(userId: string, postId: number): Promise<AddFavorite.Response> {
    const favorite = await this.prismaService.favorite.create({
      data: { userId, postId },
      select: { postId: true },
    });

    return { favorite };
  }

  async findAll(
    userId: string,
    findAllFavoritesDTO: FindAllFavorite.Request,
  ): Promise<FindAllFavorite.Response> {
    const totalQuery = this.prismaService.favorite.count({
      where: { userId },
    });

    const skip = findAllFavoritesDTO.size * (findAllFavoritesDTO.page - 1);

    const favoritesQuery = this.prismaService.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: findAllFavoritesDTO.size,
      skip,
      select: { postId: true },
    });

    const [total, content] = await this.prismaService.$transaction([
      totalQuery,
      favoritesQuery,
    ]);

    return {
      total,
      page: findAllFavoritesDTO.page,
      size: findAllFavoritesDTO.size,
      content,
    };
  }

  async remove(
    userId: string,
    postId: number,
  ): Promise<RemoveFavorite.Response> {
    await this.prismaService.favorite.delete({
      where: { userId_postId: { userId, postId } },
    });

    return;
  }
}
