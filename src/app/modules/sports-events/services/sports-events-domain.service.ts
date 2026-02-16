import { inject, Injectable } from '@angular/core';
import { SportsEventsApiService } from './sports-events-api.service';
import { Domain } from '../../../core/services/domain/domain';
import { ToastService } from '../../../shared/components/toast/toast.service';
import {
  PaginatedData,
  PaginationValues,
} from '../../../shared/utils/pagination/pagination.models';
import { map, Observable, tap } from 'rxjs';
import {
  SportEventCreateRawDTO,
  SportEventEntityParsedDTO,
  SportEventEntityPlainDTO,
  SportEventPaginatedParsedDTO,
  SportEventPaginatedPlainDTO,
} from '../models/sports-events.models';
import * as R from 'remeda';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SportsEventsDomainService {
  protected readonly sportsEventsApiService = inject(SportsEventsApiService);
  protected readonly domainService = inject(Domain);
  protected readonly toastService = inject(ToastService);

  getPaginated = (
    pagination: PaginationValues,
  ): Observable<PaginatedData<SportEventPaginatedPlainDTO>> => {
    return this.sportsEventsApiService.getPaginated(pagination).pipe(
      map((paginated) => ({
        ...paginated,
        data: R.map(paginated.data, (sportEvent) =>
          this.transformPlainPaginatedToProcessed(sportEvent),
        ),
      })),
    );
  };

  getOne = (id: number): Observable<SportEventEntityParsedDTO> => {
    return this.sportsEventsApiService.getOne(id).pipe(
      map((sportEvent) => this.transformPlainEntitytoProcessed(sportEvent)),
      tap({
        error: (error: HttpErrorResponse) => {
          const { message } = error.error;
          this.toastService.error(message);
        },
      }),
    );
  };

  createOne = (sportEvent: SportEventCreateRawDTO): Observable<SportEventEntityParsedDTO> => {
    return this.sportsEventsApiService
      .createOne(sportEvent)
      .pipe(map((sportEvent) => this.transformPlainEntitytoProcessed(sportEvent)));
  };

  private transformPlainPaginatedToProcessed = (
    plain: SportEventPaginatedPlainDTO,
  ): SportEventPaginatedParsedDTO => {
    return plain;
  };

  private transformPlainEntitytoProcessed = (
    plain: SportEventEntityPlainDTO,
  ): SportEventEntityParsedDTO => {
    const dates = this.domainService.parseCommonEntityAttributes(plain);
    return R.merge(plain, dates);
  };
}
