import { Injectable } from '@angular/core';
import { Api } from '../../../core/services/api/api';
import { HttpClient } from '@angular/common/http';
import { AuthLogInRequest, AuthLogInResponse } from '../models/authentication.models';
import { PasswordRecoveryRequestDTO } from '../../password-recoveries/models/password-recoveries.models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationApi {
  private getRootRoute = () => `${this.apiService.getRoot()}/auth`;
  private getLogInRoute = () => `${this.getRootRoute()}/log-in`;
  private getRefreshRoute = () => `${this.getRootRoute()}/refresh`;
  private getRequestRecoveryRoute = () => `${this.getRootRoute()}/request-recovery`;
  private getPasswordRecoverRoute = () => `${this.getRootRoute()}/request-password`;

  constructor(
    private readonly apiService: Api,
    private readonly httpClient: HttpClient,
  ) {}

  logIn = (payload: AuthLogInRequest) => {
    return this.httpClient.post<AuthLogInResponse>(this.getLogInRoute(), payload);
  };

  refresh = (token: string) => {
    return this.httpClient.post<AuthLogInResponse>(this.getRefreshRoute(), { token });
  };

  requestRecovery = (email: string) => {
    return this.httpClient.post<void>(this.getRequestRecoveryRoute(), { email });
  };

  recoverPassword = (request: PasswordRecoveryRequestDTO) => {
    return this.httpClient.post<void>(this.getPasswordRecoverRoute(), request)
  }
}
