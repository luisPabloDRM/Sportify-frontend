import { Injectable } from '@angular/core';
import { Api } from '../../../core/services/api/api';
import { HttpClient } from '@angular/common/http';
import { PasswordRecoveryValidityDTO } from '../models/password-recoveries.models';

@Injectable({
  providedIn: 'root',
})
export class PasswordRecoveriesApi {
  private getRootRoute = () => `${this.apiService.getRoot()}/password-recoveries`;
  private getOneRoute = (id: number) => `${this.getRootRoute()}/${id}`;
  private getValidityRoute = (id: number) => `${this.getOneRoute(id)}/validity`;
  
  constructor(
    private readonly apiService: Api,
    private readonly httpClient: HttpClient
  ){}

  getValidity = (id: number) => {
    return this.httpClient.get<PasswordRecoveryValidityDTO>(this.getValidityRoute(id))
  };
}
