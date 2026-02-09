import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, combineLatest, EMPTY, filter, interval, of, switchMap, tap } from 'rxjs';
import { AuthenticationApi } from './authentication-api';
import { AuthUser } from '../../../core/services/auth-user/auth-user';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { Router } from '@angular/router';
import { PasswordRecoveryRequestDTO } from '../../password-recoveries/models/password-recoveries.models';
import { AuthLogInRequest } from '../models/authentication.models';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationDomain {
  protected readonly autorefresh$ = interval(5000).pipe(
    filter(() => this.authUser.verifyRefreshIsRequired()),
    switchMap(() => this.refresh().pipe(catchError(() => of(EMPTY)))),
    takeUntilDestroyed(),
  );

  protected readonly autosuscribe = combineLatest([this.autorefresh$])
    .pipe(takeUntilDestroyed())
    .subscribe();

  constructor(
    private readonly authenticationApiService: AuthenticationApi,
    private readonly authUser: AuthUser,
    private readonly router: Router,
    private readonly toastService: ToastService,
  ) {}

  logIn = (data: AuthLogInRequest) => {
    return this.authenticationApiService.logIn(data).pipe(
      tap((auth) => this.authUser.set(auth)),
      catchError((error: HttpErrorResponse) => {
        const { message } = error.error;
        this.toastService.error(message);
        throw error;
      }),
    );
  };

  logOut = () => {
    this.authUser.delete();
    this.router.navigate(['/authentication', 'log-in']);
  };

  requestRecovery = (email: string) => {
    return this.authenticationApiService.requestRecovery(email);
  };

  recoverPassword = (request: PasswordRecoveryRequestDTO) => {
    return this.authenticationApiService.recoverPassword(request);
  };

  refresh = () => {
    const token = this.authUser.get()?.refreshToken ?? '';

    return this.authenticationApiService
      .refresh(token)
      .pipe(tap((response) => this.authUser.set(response)));
  };

  verifyRefreshIsAvailable = () => {
    return this.authUser.verifyRefreshIsRequired();
  };

  verifyRefreshIsExpired = () => {
    return this.authUser.verifyRefreshIsExpired();
  };

  verifyTokenIsExpired = () => {
    return this.authUser.verifyTokenIsExpired();
  };
}
