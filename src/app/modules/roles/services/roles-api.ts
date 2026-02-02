import { Injectable } from '@angular/core';
import { Api } from '../../../core/services/api/api';
import { HttpClient } from '@angular/common/http';
import { RoleEntityPlainDTO } from '../models/roles.models';

@Injectable({
  providedIn: 'root',
})
export class RolesApi {
  private getRootRoute = () => `${this.apiService.getRoot()}/roles`;

  constructor(
    private readonly apiService: Api,
    private readonly httpClient: HttpClient,
  ) {}

  getAll = () => {
    return this.httpClient.get<RoleEntityPlainDTO[]>(this.getRootRoute());
  };
}
