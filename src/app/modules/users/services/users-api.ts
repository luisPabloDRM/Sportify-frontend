import { Injectable } from '@angular/core';
import { Api } from '../../../core/services/api/api';
import { HttpClient } from '@angular/common/http';
import { UserCreateDTO, UserEntityPlainDTO } from '../models/users.models';

@Injectable({
  providedIn: 'root',
})
export class UsersApi {
  private getRootRoute = () => `${this.api.getRoot()}/users`;
  private getOneRoute = (id: number) => `${this.getRootRoute()}/${id}`;

  constructor(
    private readonly api: Api,
    private readonly httpClient: HttpClient,
  ) {}

  getOne = (id: number) => {
    return this.httpClient.get<UserEntityPlainDTO>(this.getOneRoute(id));
  };

  createOne = (user: UserCreateDTO)=> {
    return this.httpClient.post<UserEntityPlainDTO>(this.getRootRoute(), user)
  }

  deleteOne = (id: number) => {
    return this.httpClient.delete<void>(this.getOneRoute(id))
  } 
}
