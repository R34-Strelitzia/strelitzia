import {
  ArgumentsHost,
  Catch,
  HttpServer,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { v1 } from 'uuid';

export type PrismaErrorCodesMapping = {
  [key: string]: {
    httpStatusCode: number;
    message(msg: string): string;
  };
};

@Catch(Prisma?.PrismaClientKnownRequestError)
export class PrismaFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(PrismaFilter.name);
  private readonly prismaErrorCodesMapping: PrismaErrorCodesMapping = {
    P2000: {
      httpStatusCode: HttpStatus.BAD_REQUEST,
      message: (msg: string) => `BAD REQUEST: ${msg}.`,
    },
    P2002: {
      httpStatusCode: HttpStatus.CONFLICT,
      message: (msg: string) => `CONFLICT: ${msg}.`,
    },
    P2003: {
      httpStatusCode: HttpStatus.CONFLICT,
      message: (msg: string) => `CONFLICT: ${msg}.`,
    },
    P2025: {
      httpStatusCode: HttpStatus.NOT_FOUND,
      message: (msg: string) => `NOT FOUND: ${msg}.`,
    },
  };

  constructor(applicationRef?: HttpServer) {
    super(applicationRef);
  }

  override catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode =
      this.prismaErrorCodesMapping[exception.code]?.httpStatusCode;

    if (!statusCode) {
      const exceptionId = v1();

      this.logger.error(exceptionId, exception);

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Internal Server Error TraceID: ${exceptionId}`,
      });
    }

    const exceptionMessage = exception.message.split('invocation:')[1]?.trim();
    const message =
      this.prismaErrorCodesMapping[exception.code].message(exceptionMessage);

    return response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
