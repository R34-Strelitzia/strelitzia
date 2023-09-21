import { HttpStatus } from '@nestjs/common';

export type PrismaErrorCodesMapping = {
  [key: string]:
    | {
        httpStatusCode: HttpStatus;
        message(msg: string): string;
      }
    | undefined;
};

export const prismaErrorCodes: PrismaErrorCodesMapping = {
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
