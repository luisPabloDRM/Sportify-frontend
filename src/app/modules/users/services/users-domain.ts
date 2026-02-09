import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserCreateDTO, UserEntityParsedDTO, UserEntityPlainDTO } from '../models/users.models';
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

  deleteOne= (id: number) => {
    return this.usersApiService.deleteOne(id)
  }

  private transformRawEntityToProcessed = (raw: UserEntityPlainDTO): UserEntityParsedDTO => {
    const dates = this.domain.parseCommonEntityAttributes(raw);
    return R.merge(raw, dates);
  };
}
