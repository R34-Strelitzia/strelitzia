import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { PrismaFilter } from '@strelitzia/prisma';

import { AppModule } from './app/app.module';
import { setupSwagger } from '@strelitzia/backend/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning();

  app.enableShutdownHooks();

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaFilter(httpAdapter));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  app.use(helmet());
  app.enableCors();

  setupSwagger(app);

  const port = process.env.PORT || 3333;
  await app.listen(port, '0.0.0.0');

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
