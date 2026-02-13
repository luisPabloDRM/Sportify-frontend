import { Injectable } from '@angular/core';
import { Api } from '../../../core/services/api/api';
import { HttpClient } from '@angular/common/http';
import { SportEntityPlainDTO } from '../models/sports.models';

@Injectable({
  providedIn: 'root',
})
export class SportsApiService {
  private getRootRoute = () => `${this.apiService.getRoot()}/sports`;
  private getOneRoute = (id: number) => `${this.getRootRoute()}/${id}`;
  private getAllRoute = () => `${this.getRootRoute()}/all`;

  constructor(private readonly apiService: Api, private readonly httpClient: HttpClient) {}

  getAll = () => {
    return this.httpClient.get<SportEntityPlainDTO[]>(this.getAllRoute());
  };

  getOne = (id: number) => {
    return this.httpClient.get<SportEntityPlainDTO>(this.getOneRoute(id))
  }
}
