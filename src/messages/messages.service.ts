import { Injectable } from '@nestjs/common';
import { Message, Prisma } from '@prisma/client';
import * as fs from 'fs-extra';
import axios from 'axios';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  create(createMessageInput: Prisma.MessageCreateInput) {
    return this.prisma.message.create({
      data: createMessageInput,
    });
  }

  findAll() {
    return this.prisma.message.findMany();
  }

  kladMessages(kladId: string) {
    return this.prisma.message.findMany({
      where: {
        kladId,
      },
    });
  }

  async deleteKladMessages(kladId: string) {
    const { count } = await this.prisma.message.deleteMany({
      where: {
        kladId,
      },
    });
    return count;
  }

  findOne(messageWhereUniqueInput: Prisma.MessageWhereUniqueInput) {
    try {
      return this.prisma.message.findUniqueOrThrow({
        where: messageWhereUniqueInput,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  forUser(authorId: string) {
    return this.prisma.message.findMany({
      where: {
        authorId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  forKlad(kladId: string) {
    return this.prisma.message.findMany({
      where: {
        kladId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
