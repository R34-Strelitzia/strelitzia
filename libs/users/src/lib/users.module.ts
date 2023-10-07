import { Module } from '@nestjs/common';

import { PrismaModule } from '@strelitzia/backend/prisma';

import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
