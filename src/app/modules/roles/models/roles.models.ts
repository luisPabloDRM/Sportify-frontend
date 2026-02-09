import { strict } from 'assert';
import { PermissionEntityPlainDTO } from '../../permissions/models/permissions.models';
import { DateTime } from 'luxon';

export type RoleEntityPlainDTO = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  permissions: PermissionEntityPlainDTO[];
};

export type RoleEntityParsedDTO = Omit<RoleEntityPlainDTO, 'createdAt'| 'updatedAt'> & {
  createdAt: DateTime;
  updatedAt: DateTime;
};
