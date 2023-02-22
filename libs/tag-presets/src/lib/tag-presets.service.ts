import { Injectable } from '@nestjs/common';
import { PrismaService } from '@strelitzia/prisma';
import {
  CreatePreset,
  DeletePreset,
  FindAllPresets,
  PresetWithID,
  Rating,
  UpdatePreset,
} from '@strelitzia/contracts/v2';

@Injectable()
export class TagPresetsService {
  private readonly select = {
    id: true,
    allowed: true,
    banned: true,
    minimalScore: true,
    rating: true,
    title: true,
  } satisfies Record<keyof PresetWithID, true>;

  constructor(private readonly prismaService: PrismaService) {}

  async create(
    userId: string,
    dto: CreatePreset.Request
  ): Promise<CreatePreset.Response> {
    const { title, allowed, banned } = dto.preset;

    const preset = await this.prismaService.tagPreset.create({
      data: { userId, title, allowed, banned, rating: Rating.ANY },
      select: this.select,
    });

    return { preset };
  }

  async findAll(
    userId: string,
    dto: FindAllPresets.Request
  ): Promise<FindAllPresets.Response> {
    const presets = await this.prismaService.tagPreset.findMany({
      where: { userId },
      take: dto.pagination.size,
      skip: dto.pagination.size * dto.pagination.page,
      orderBy: { updatedAt: 'desc' },
      select: this.select,
    });

    return { presets };
  }

  async update(
    userId: string,
    dto: UpdatePreset.Request
  ): Promise<UpdatePreset.Response> {
    const preset = await this.prismaService.tagPreset.update({
      where: { id_userId: { id: dto.preset.id, userId } },
      data: { ...dto.preset },
      select: this.select,
    });

    return { preset };
  }

  async delete(userId: string, id: string): Promise<DeletePreset.Response> {
    await this.prismaService.tagPreset.delete({
      where: { id_userId: { id, userId } },
    });

    return;
  }
}
