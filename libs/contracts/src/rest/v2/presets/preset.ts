import {
  IsArray,
  IsEnum,
  IsInt,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

import { ApiProperty, OmitType } from '@nestjs/swagger';

import { Rating, RatingTitle } from './rating';

export class TagPresetEntity {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  @Length(3, 30)
  title: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  allowed: string[];

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  banned: string[];

  @ApiProperty()
  @IsInt()
  minimalScore: number;

  @ApiProperty({ enum: Rating })
  @IsEnum(Rating)
  rating: RatingTitle;
}

export class TagPresetWithoutId extends OmitType(TagPresetEntity, ['id']) {}
