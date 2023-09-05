import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Klad } from '../graphql';
import { MessagesService } from './messages.service';
import { Message } from '@prisma/client';

@Resolver(() => Klad)
export class KladsResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @ResolveField()
  messages(@Parent() klad: Klad): Promise<Message[]> {
    return this.messagesService.forKlad(klad.id);
  }
}
