import { Injectable, NotFoundException } from '@nestjs/common';

import {
  CreatePreset,
  DeletePreset,
  FindAllPresets,
  FindOnePresets,
  TagPresetEntity,
  UpdatePreset,
} from '@strelitzia/contracts/v2';
import { PrismaService } from '@strelitzia/backend/prisma';

@Injectable()
export class TagPresetsService {
  private readonly select = {
    id: true,
    allowed: true,
    banned: true,
    minimalScore: true,
    rating: true,
    title: true,
  } satisfies Record<keyof TagPresetEntity, true>;

  constructor(private readonly prismaService: PrismaService) {}

  public async create(
    userId: string,
    createPresetDTO: CreatePreset.Request,
  ): Promise<CreatePreset.Response> {
    const preset = await this.prismaService.tagPreset.create({
      data: { userId, ...createPresetDTO.preset },
      select: this.select,
    });

    return { preset };
  }

  public async findAll(
    userId: string,
    findAllPresetsDTO: FindAllPresets.Request,
  ): Promise<FindAllPresets.Response> {
    const totalQuery = this.prismaService.tagPreset.count({
      where: { userId },
    });

    const skip = findAllPresetsDTO.size * (findAllPresetsDTO.page - 1);

    const presetsQuery = this.prismaService.tagPreset.findMany({
      where: { userId },
      take: findAllPresetsDTO.size,
      skip,
      orderBy: { updatedAt: 'desc' },
      select: this.select,
    });

    const [total, content] = await this.prismaService.$transaction([
      totalQuery,
      presetsQuery,
    ]);

    return {
      total,
      page: findAllPresetsDTO.page,
      size: findAllPresetsDTO.size,
      content,
    };
  }

  public async findOne(
    userId: string,
    id: string,
  ): Promise<FindOnePresets.Response> {
    const preset = await this.prismaService.tagPreset.findUnique({
      where: { id_userId: { id, userId } },
      select: this.select,
    });

    if (!preset) {
      throw new NotFoundException();
    }

    return { preset };
  }

  public async update(
    userId: string,
    id: string,
    updatePresetDTO: UpdatePreset.Request,
  ): Promise<UpdatePreset.Response> {
    const preset = await this.prismaService.tagPreset.update({
      where: { id_userId: { id, userId } },
      data: { ...updatePresetDTO.preset },
      select: this.select,
    });

    return { preset };
  }

  public async delete(
    userId: string,
    id: string,
  ): Promise<DeletePreset.Response> {
    await this.prismaService.tagPreset.delete({
      where: { id_userId: { id, userId } },
    });

    return;
  }
}
