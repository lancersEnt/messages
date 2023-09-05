import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'prisma/prisma.service';
import { KladsResolver } from './klads.resolver';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [AuthModule],
  providers: [
    PrismaService,
    MessagesResolver,
    MessagesService,
    KladsResolver,
    UsersResolver,
  ],
  exports: [MessagesService],
})
export class MessagesModule {}
