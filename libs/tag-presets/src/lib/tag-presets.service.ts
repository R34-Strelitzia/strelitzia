import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@strelitzia/prisma';
import {
  CreatePreset,
  DeletePreset,
  FindAllPresets,
  FindOnePresets,
  TagPresetEntity,
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
  } satisfies Record<keyof TagPresetEntity, true>;

  constructor(private readonly prismaService: PrismaService) {}

  public async create(
    userId: string,
    createPresetDTO: CreatePreset.Request,
  ): Promise<CreatePreset.Response> {
    const { title, allowed, banned } = createPresetDTO.preset;

    const preset = await this.prismaService.tagPreset.create({
      data: { userId, title, allowed, banned, rating: Rating.ANY },
      select: this.select,
    });

    return { preset };
  }

  public async findAll(
    userId: string,
    findAllPresetsDTO: FindAllPresets.Request,
  ): Promise<FindAllPresets.Response> {
    const presets = await this.prismaService.tagPreset.findMany({
      where: { userId },
      take: findAllPresetsDTO.pagination.size,
      skip:
        findAllPresetsDTO.pagination.size * findAllPresetsDTO.pagination.page,
      orderBy: { updatedAt: 'desc' },
      select: this.select,
    });

    return { presets };
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
