import { randomUUID } from 'crypto';
import { Replace } from '@helpers/Replace';
import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readtAt?: Date | null;
  canceledtAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private _id: string;
  private _props: NotificationProps;

  constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this._props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set recipientId(recipientId: string) {
    this._props.recipientId = recipientId;
  }

  public get recipientId(): string {
    return this._props.recipientId;
  }

  public set content(content: Content) {
    this._props.content = content;
  }

  public get content(): Content {
    return this._props.content;
  }

  public set category(category: string) {
    this._props.category = category;
  }

  public get category(): string {
    return this._props.category;
  }

  public read() {
    this._props.readtAt = new Date();
  }

  public unread() {
    this._props.readtAt = null;
  }

  public get readAt(): Date | null | undefined {
    return this._props.readtAt;
  }

  public cancel() {
    this._props.canceledtAt = new Date();
  }

  public get canceledAt(): Date | null | undefined {
    return this._props.canceledtAt;
  }

  public get createdAt(): Date {
    return this._props.createdAt;
  }
}
