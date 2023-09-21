import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@strelitzia/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public create(
    user: Pick<Prisma.UserCreateInput, 'username' | 'email' | 'hash'>,
  ): Promise<User> {
    return this.prismaService.user.create({ data: user });
  }

  public findById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  public findByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  public findByUsername(username: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { username } });
  }
}
