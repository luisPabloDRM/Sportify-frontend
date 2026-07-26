import { DateTime } from 'luxon';
import { NotificationType } from '../constants/notifications.constants';

export type NotificationEntityPlainDTO = {
  id: number;
  userId: number;
  sportEventId: number | null;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NotificationEntityParsedDTO = Omit<
  NotificationEntityPlainDTO,
  'createdAt' | 'updatedAt'
> & {
  createdAt: DateTime;
  updatedAt: DateTime;
};
