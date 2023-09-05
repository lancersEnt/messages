import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../graphql';
import { MessagesService } from './messages.service';
import { Message } from '@prisma/client';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @ResolveField()
  messages(@Parent() user: User): Promise<Message[]> {
    return this.messagesService.forUser(user.id);
  }
}
