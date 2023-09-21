import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export enum API_TAGS {
  AUTH = 'Auth',
  FAVORITES = 'Favorites',
  TAG_PRESET = 'TagPresets',
}

const config = new DocumentBuilder()
  .setTitle('Strelitzia')
  .setDescription(
    'Strelitzia is a modern and convenient service that conducts content from Rule34',
  )
  .setVersion('2.0')
  .addTag(API_TAGS.AUTH)
  .addTag(API_TAGS.FAVORITES)
  .addTag(API_TAGS.TAG_PRESET)
  .build();

export const setupSwagger = (app: INestApplication) => {
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
};
