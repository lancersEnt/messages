
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateMessageInput {
    content: string;
    kladId: string;
    authorId: string;
}

export class User {
    id: string;
    messages: Nullable<Message>[];
}

export class Klad {
    id: string;
    messages: Nullable<Message>[];
}

export class Message {
    id: string;
    content: string;
    kladId: string;
    authorId: string;
    user?: Nullable<User>;
    klad?: Nullable<Klad>;
    createdAt?: Nullable<DateTime>;
}

export abstract class IQuery {
    abstract messages(): Nullable<Message>[] | Promise<Nullable<Message>[]>;

    abstract message(id: string): Nullable<Message> | Promise<Nullable<Message>>;

    abstract kladMessages(kladId?: Nullable<string>): Nullable<Message>[] | Promise<Nullable<Message>[]>;
}

export abstract class IMutation {
    abstract createMessage(createMessageInput: CreateMessageInput): Message | Promise<Message>;

    abstract deleteKladMessages(kladId?: Nullable<string>): string | Promise<string>;
}

export abstract class ISubscription {
    abstract messageCreated(kladId?: Nullable<string>): Nullable<Message> | Promise<Nullable<Message>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
