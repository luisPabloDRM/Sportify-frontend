import { Injectable } from '@angular/core';
import {
  AuthLogInResponse,
  AuthLogInResponseParsed,
  AuthLoginResponseStringify,
} from '../../../modules/authentication/models/authentication.models';
import { StorageService } from '../../../shared/utils/storage/storage.service';
import { StorageKey } from '../../../shared/utils/storage/storage.constants';
import { DateTime } from 'luxon';
import * as R from 'remeda';
import { Permission } from '../../../modules/roles/constants/roles.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthUser {
  private auth: AuthLogInResponseParsed | null;

  constructor(private readonly storageService: StorageService) {
    const stored = storageService.get(StorageKey.AuthenticatedUser);

    if (!stored) {
      this.auth = null;
    } else {
      const parsed = JSON.parse(stored) as AuthLoginResponseStringify;

      const meta = {
        token: {
          issuedAt: DateTime.fromISO(parsed.meta.token.issuedAt),
          expiresAt: DateTime.fromISO(parsed.meta.token.expiresAt),
        },
        refreshToken: {
          renewableAt: DateTime.fromISO(parsed.meta.refreshToken.renewableAt),
          expiresAt: DateTime.fromISO(parsed.meta.refreshToken.expiresAt),
        },
      };
      this.auth = R.addProp(parsed, 'meta', meta);
    }
  }

  getOrFail = () => {
    const user = this.auth;

    if (!user) {
      throw new Error('Required user does not exists in service');
    }
    return user;
  };

  get = () => {
    return this.auth;
  };

  set = (auth: AuthLogInResponse) => {
    const meta: AuthLogInResponseParsed['meta'] = {
      token: {
        issuedAt: DateTime.fromSeconds(auth.meta.token.issuedAt),
        expiresAt: DateTime.fromSeconds(auth.meta.token.expiresAt),
      },
      refreshToken: {
        renewableAt: DateTime.fromSeconds(auth.meta.refreshToken.renewableAt),
        expiresAt: DateTime.fromSeconds(auth.meta.refreshToken.expiresAt),
      },
    };
    this.auth = R.addProp(auth, 'meta', meta);
    const data  = JSON.stringify(this.auth);
    this.storageService.set(StorageKey.AuthenticatedUser, data)
  };

  delete = () => {
    this.storageService.delete(StorageKey.AuthenticatedUser);
    this.auth = null;
  }

  hasPermission = (permission: Permission) => {
    return R.isTruthy(this.auth?.user.permissions[permission]);
  }

  verifyRefreshIsAvailable = () => {
    const date = this.auth?.meta.refreshToken.renewableAt;
    return DateTime.isDateTime(date) ? date < DateTime.now() : false;
  }

  verifyRefreshIsRequired = () => {
    const date = this.auth?.meta.refreshToken.expiresAt;
    return DateTime.isDateTime(date) ? date.diffNow('seconds').seconds <= 300 : false
  }

  verifyRefreshIsExpired = () => {
    const date = this.auth?.meta.refreshToken.expiresAt;
    return DateTime.isDateTime(date) ? date < DateTime.now() : false
  }

  verifyTokenIsExpired = () => {
    const date = this.auth?.meta.token.expiresAt;
    return DateTime.isDateTime(date) ? date < DateTime.now() : false
  }
}
