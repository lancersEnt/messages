import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Context,
  Subscription,
} from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Prisma } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { Klad, Message, User } from 'src/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

const pubSub = new PubSub();

@Resolver('Message')
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation('createMessage')
  @UseGuards(JwtAuthGuard)
  async create(
    @Context() context: any,
    @Args('createMessageInput') createMessageInput: Prisma.MessageCreateInput,
  ) {
    const { req, res } = context;
    const userId: string = req.user.userId;
    createMessageInput.authorId = userId;
    const created = await this.messagesService.create(createMessageInput);
    pubSub.publish('messageCreated', { messageCreated: created });
    return created;
  }

  @Mutation('deleteKladMessages')
  async deleteKladMessages(@Args('kladId') kladId: string) {
    const count = await this.messagesService.deleteKladMessages(kladId);
    if (count > 0) return 'deleted';
    return 'nothing to delete';
  }

  @Query('messages')
  findAll() {
    return this.messagesService.findAll();
  }

  @Query('kladMessages')
  kladMessages(@Args('kladId') kladId: string) {
    return this.messagesService.kladMessages(kladId);
  }

  @Query('message')
  findOne(@Args('id') id: string) {
    return this.messagesService.findOne({ id });
  }

  @Subscription(() => Message, {
    filter(payload, variables) {
      return payload.messageCreated.kladId === variables.kladId;
    },
  })
  messageCreated() {
    return pubSub.asyncIterator('messageCreated');
  }

  @ResolveField(() => User)
  user(@Parent() message: Message) {
    return { __typename: 'User', id: message.authorId };
  }

  @ResolveField(() => Klad)
  klad(@Parent() message: Message) {
    return { __typename: 'Klad', id: message.kladId };
  }
}
