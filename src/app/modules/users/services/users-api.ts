import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../../../core/services/api/api';
import { PaginationService } from '../../../shared/utils/pagination/pagination.service';
import { PaginatedData, PaginationValues } from '../../../shared/utils/pagination/pagination.models';
import { UserCreateDTO, UserEntityPlainDTO, UserPaginatedPlainDTO, UserRegisterDTO } from '../models/users.models';

@Injectable({
  providedIn: 'root',
})
export class UsersApi {
  private readonly paginationService = inject(PaginationService);

  private getRootRoute = () => `${this.api.getRoot()}/users`;
  private getOneRoute = (id: number) => `${this.getRootRoute()}/${id}`;
  private getProfileRoute = () => `${this.getRootRoute()}/profile`;

  constructor(
    private readonly api: Api,
    private readonly httpClient: HttpClient,
  ) {}

  getPaginated = (pagination: PaginationValues) => {
    return this.httpClient.get<PaginatedData<UserPaginatedPlainDTO>>(this.getRootRoute(), {
      params: this.paginationService.toHttpParams(pagination),
    });
  };

  getProfile = () => {
    return this.httpClient.get<UserEntityPlainDTO>(this.getProfileRoute());
  };

  register = (data: UserRegisterDTO) => {
    return this.httpClient.post<UserEntityPlainDTO>(`${this.api.getRoot()}/register`, data);
  };

  getOne = (id: number) => {
    return this.httpClient.get<UserEntityPlainDTO>(this.getOneRoute(id));
  };

  createOne = (user: UserCreateDTO) => {
    return this.httpClient.post<UserEntityPlainDTO>(this.getRootRoute(), user);
  };

  deleteOne = (id: number) => {
    return this.httpClient.delete<void>(this.getOneRoute(id));
  };
}
