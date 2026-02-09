import { Injectable } from '@angular/core';
import { RolesApi } from './roles-api';
import { Domain } from '../../../core/services/domain/domain';
import { map, Observable } from 'rxjs';
import { RoleEntityParsedDTO, RoleEntityPlainDTO } from '../models/roles.models';
import * as R from 'remeda';

@Injectable({
  providedIn: 'root',
})
export class RolesDomain {
  constructor(
    private readonly rolesApiService: RolesApi,
    private readonly domainService: Domain,
  ) {}

  getAll = (): Observable<RoleEntityParsedDTO[]> => {
    return this.rolesApiService
      .getAll()
      .pipe(map((roles) => R.map(roles, (role) => this.transformRawToProcessed(role))));
  };

  private transformRawToProcessed = (raw: RoleEntityPlainDTO): RoleEntityParsedDTO => {
    const dates = this.domainService.parseCommonEntityAttributes(raw);
    return R.merge(raw, dates);
  };
}
