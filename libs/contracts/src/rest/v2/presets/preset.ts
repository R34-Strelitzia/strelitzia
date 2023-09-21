import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

import { Rating, RatingTitle } from './rating';

export class Preset {
  @IsString()
  @Length(3, 30)
  title: string;

  @IsArray()
  @IsString({ each: true })
  allowed: string[];

  @IsArray()
  @IsString({ each: true })
  banned: string[];

  @IsOptional()
  @IsNumber()
  minimalScore?: number;

  @IsOptional()
  @IsEnum(Rating)
  rating?: RatingTitle;
}

export class PresetWithID extends Preset {
  @IsUUID()
  id: string;
}
