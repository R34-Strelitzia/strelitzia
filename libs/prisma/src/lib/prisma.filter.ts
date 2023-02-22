import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpServer,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { v1 } from 'uuid';

import { prismaErrorCodes } from './prisma-error-codes.mapping';

@Catch(Prisma?.PrismaClientKnownRequestError)
export class PrismaFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(PrismaFilter.name);

  constructor(applicationRef?: HttpServer) {
    super(applicationRef);
  }

  override catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost
  ) {
    const statusCode = prismaErrorCodes[exception.code]?.httpStatusCode;

    if (!statusCode) {
      const exceptionTraceId = v1();

      this.logger.error(exceptionTraceId, exception);

      return super.catch(
        new InternalServerErrorException(
          `Internal Server Error TraceID: ${exceptionTraceId}`
        ),
        host
      );
    }

    const message = this.formatPrismaExceptionMessage(exception);

    return super.catch(new HttpException(message, statusCode), host);
  }

  private formatPrismaExceptionMessage(
    exception: Prisma.PrismaClientKnownRequestError
  ): string {
    const truncatedMessage = exception.message.split('invocation:')[1]?.trim();
    const formattedMessage =
      prismaErrorCodes[exception.code]?.message(truncatedMessage);

    return formattedMessage ?? '';
  }
}
