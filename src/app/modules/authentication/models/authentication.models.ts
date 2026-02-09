import { DateTime } from 'luxon';
import { UserEntityParsedDTO } from '../../users/models/users.models';
import { Permission } from '../../roles/constants/roles.constants';
import { RoleEntityParsedDTO } from '../../roles/models/roles.models';

export type AuthLogInRequest = {
  email: string;
  password: string;
};

export type AuthLogInResponse = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
  meta: AuthMeta;
};

export type AuthLogInResponseParsed = Omit<AuthLogInResponse, 'meta'> & {
  meta: {
    token: {
      issuedAt: DateTime;
      expiresAt: DateTime;
    };
    refreshToken: {
      renewableAt: DateTime;
      expiresAt: DateTime;
    };
  };
};

export type AuthLoginResponseStringify = Omit<AuthLogInResponse, 'meta'> & {
  meta: {
    token: {
      issuedAt: string;
      expiresAt: string;
    };
    refreshToken: {
      renewableAt: string;
      expiresAt: string;
    };
  };
};

export type AuthUser = Pick<UserEntityParsedDTO, 'id' | 'fullname' | 'email'> & {
  role: Pick<RoleEntityParsedDTO, 'id' | 'name'>;
  permissions: Record<Permission, boolean>;
};

export type AuthMeta = {
  token: {
    issuedAt: number;
    expiresAt: number;
  };
  refreshToken: {
    renewableAt: number;
    expiresAt: number;
  };
};
