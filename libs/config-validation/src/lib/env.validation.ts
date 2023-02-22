import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  validateSync,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  JWT_ISSUER: string;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_SECRET: string;

  @IsNumber()
  @Min(60)
  JWT_ACCESS_EXPIRES_SECONDS: number;

  @IsNumber()
  @Min(60)
  JWT_REFRESH_EXPIRES_SECONDS: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
