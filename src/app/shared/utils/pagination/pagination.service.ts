import { Injectable } from '@angular/core';
import { Pagination, PaginationFilterType, PaginationValues } from './pagination.models';
import { HttpParams } from '@angular/common/http';
import { DateTime } from 'luxon';
import { ActivatedRoute, Router } from '@angular/router';
import * as R from 'remeda';
import { PAGINATION_COMMON_PROPERTIES } from './pagination.constants';
import { HttpService } from '../../../core/services/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly httpService: HttpService,
    private readonly router: Router
  ) {}

  toHttpParams = (pagination: PaginationValues) => {
    const parameters = new HttpParams({
      fromObject: R.omit(pagination, ['filters']),
    });
    return this.httpService.composeHttpParams(pagination.filters, parameters);
  };

  fromQueryParams = <T>(
    definition: Record<string, PaginationFilterType>,
    values: Partial<PaginationValues> = {}
  ): Pagination<T> => {
    const parameters = R.merge(
      R.pick(this.activatedRoute.snapshot.queryParams, PAGINATION_COMMON_PROPERTIES),
      R.pick(values, PAGINATION_COMMON_PROPERTIES)
    );
    const raw = R.merge(
      R.omit(this.activatedRoute.snapshot.queryParams, PAGINATION_COMMON_PROPERTIES),
      R.clone(values.filters)
    );
    const filters = this.parseParametersBaseOnDefinition(raw, definition);

    return new Pagination<T>({ ...parameters, filters });
  };

  updateQueryParams = (value: PaginationValues) => {
    const parameters = R.pick(value, PAGINATION_COMMON_PROPERTIES);
    const queryParams = R.merge(parameters, value.filters);
    this.router.navigate([], { queryParams, relativeTo: this.activatedRoute });
  };

  private parseParametersBaseOnDefinition = (
    filters: Record<string, any>,
    definition: Record<string, PaginationFilterType>
  ) => {
    return R.pipe(
      R.entries(filters),
      R.map(([key, value]) => {
        switch (definition[key]) {
          case 'number': {
            const num = Number.parseInt(value);
            return Number.isNaN(num) ? [] : [key, num];
          }
          case 'date': {
            const date = DateTime.fromISO(value);
            return date.isValid ? [key, date] : [];
          }
          case 'boolean': {
            return [key, value === 'true'];
          }
          case 'arrayNumber': {
            const array = R.isArray(value) ? value : [value];

            const parsed = R.pipe(
              R.map(array, (v) => Number.parseInt(v)),
              R.filter(R.isNumber)
            );
            return [key, parsed];
          }
          case 'arrayString': {
            return [key, value];
          }
          default: {
            return [key, value];
          }
        }
      }),
      R.mapToObj(([key, value]) => [key, value])
    );
  };
}
