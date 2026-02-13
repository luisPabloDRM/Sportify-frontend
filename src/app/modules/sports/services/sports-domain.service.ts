import { Injectable } from '@angular/core';
import { SportsApiService } from './sports-api.service';
import { Domain } from '../../../core/services/domain/domain';
import { map, Observable } from 'rxjs';
import * as R from 'remeda';
import { SportEntityParsedDTO, SportEntityPlainDTO } from '../models/sports.models';

@Injectable({
  providedIn: 'root',
})
export class SportsDomainService {
  constructor(
    private readonly sportsApiService: SportsApiService,
    private readonly domainService: Domain,
  ) {}

  getAll = (): Observable<SportEntityParsedDTO[]> => {
    return this.sportsApiService
      .getAll()
      .pipe(map((sports) => R.map(sports, (sport) => this.trasformRawToProcessed(sport))));
  };

  getOne = (id: number) => {
    return this.sportsApiService
      .getOne(id)
      .pipe(map((sport) => this.trasformPlainEntityToProcessed(sport)));
  };

  private trasformPlainEntityToProcessed = (plain: SportEntityPlainDTO): SportEntityParsedDTO => {
    const attributes = this.domainService.parseCommonEntityAttributes(plain);
    return R.merge(plain, attributes);
  };

  private trasformRawToProcessed = (raw: SportEntityPlainDTO): SportEntityParsedDTO => {
    const dates = this.domainService.parseCommonEntityAttributes(raw);
    return R.merge(raw, dates);
  };
}
