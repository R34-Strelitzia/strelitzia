import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { PrismaFilter, PrismaService } from '@strelitzia/prisma';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/v2';
  app.setGlobalPrefix(globalPrefix);

  /*
   * Check this: https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
   */
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());

  app.use(helmet());
  app.enableCors();

  const port = process.env.PORT || 3333;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
