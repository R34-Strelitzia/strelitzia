import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@strelitzia/prisma';
import {
  AddFavorite,
  FindAllFavorite,
  RemoveFavorite,
} from '@strelitzia/contracts/v2';

@Injectable()
export class FavoritesService {
  constructor(private readonly prismaService: PrismaService) {}

  async add(userId: string, postId: number): Promise<AddFavorite.Response> {
    const favorite = await this.prismaService.favorite.create({
      data: { userId, postId },
    });

    return { favorite: { postId: favorite.postId } };
  }

  async findAll(
    userId: string,
    dto: FindAllFavorite.Request
  ): Promise<FindAllFavorite.Response> {
    const favorites = await this.prismaService.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: dto.pagination.size,
      skip: dto.pagination.size * dto.pagination.page,
      select: { postId: true },
    });

    if (favorites.length === 0) {
      throw new NotFoundException();
    }

    return { favorites };
  }

  async remove(
    userId: string,
    postId: number
  ): Promise<RemoveFavorite.Response> {
    await this.prismaService.favorite.delete({
      where: { userId_postId: { userId, postId } },
    });

    return;
  }
}
