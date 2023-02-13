import { Module } from '@nestjs/common';
import { PrismaModule } from '@strelitzia/prisma';

import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, PrismaModule],
})
export class AppModule {}
