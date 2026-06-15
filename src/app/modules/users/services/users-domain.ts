import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PaginatedData, PaginationValues } from '../../../shared/utils/pagination/pagination.models';
import {
  UserCreateDTO,
  UserEntityParsedDTO,
  UserEntityPlainDTO,
  UserPaginatedPlainDTO,
  UserRegisterDTO,
} from '../models/users.models';
import * as R from 'remeda';
import { UsersApi } from './users-api';
import { Domain } from '../../../core/services/domain/domain';

@Injectable({
  providedIn: 'root',
})
export class UsersDomain {
  constructor(
    private readonly usersApiService: UsersApi,
    private readonly domain: Domain,
  ) {}

  register = (data: UserRegisterDTO): Observable<UserEntityParsedDTO> => {
    return this.usersApiService.register(data).pipe(
      map((user) => this.transformRawEntityToProcessed(user)),
    );
  };

  getPaginated = (pagination: PaginationValues): Observable<PaginatedData<UserPaginatedPlainDTO>> => {
    return this.usersApiService.getPaginated(pagination);
  };

  getProfile = (): Observable<UserEntityParsedDTO> => {
    return this.usersApiService.getProfile().pipe(
      map((user) => this.transformRawEntityToProcessed(user)),
    );
  };

  getOne = (id: number): Observable<UserEntityParsedDTO> => {
    return this.usersApiService
      .getOne(id)
      .pipe(map((user) => this.transformRawEntityToProcessed(user)));
  };

  createOne = (user: UserCreateDTO): Observable<UserEntityParsedDTO> => {
    return this.usersApiService
      .createOne(user)
      .pipe(map((user) => this.transformRawEntityToProcessed(user)));
  };

  deleteOne = (id: number) => {
    return this.usersApiService.deleteOne(id);
  };

  private transformRawEntityToProcessed = (raw: UserEntityPlainDTO): UserEntityParsedDTO => {
    const dates = this.domain.parseCommonEntityAttributes(raw);
    return R.merge(raw, dates);
  };
}
