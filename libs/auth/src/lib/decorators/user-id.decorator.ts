import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { IAuthenticatedUser } from '../interfaces';

/**
 * Extract userId after pass JwtAuthGuard
 * @returns {string} userId
 */
export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<unknown & { user: IAuthenticatedUser }>();
    return request.user.id;
  }
);
