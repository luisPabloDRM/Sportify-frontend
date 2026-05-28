import { inject, Injectable } from '@angular/core';
import {
  PaginatedData,
  PaginationValues,
} from '../../../shared/utils/pagination/pagination.models';
import { HttpClient } from '@angular/common/http';
import {
  SportEventCreateRawDTO,
  SportEventEntityPlainDTO,
  SportEventPaginatedPlainDTO,
} from '../models/sports-events.models';
import { PaginationService } from '../../../shared/utils/pagination/pagination.service';
import { Api } from '../../../core/services/api/api';

@Injectable({
  providedIn: 'root',
})
export class SportsEventsApiService {
  protected readonly httpClient = inject(HttpClient);
  protected readonly paginationService = inject(PaginationService);
  protected readonly apiService = inject(Api);

  private getRootRoute = () => `${this.apiService.getRoot()}/sport-events`;
  private getOneRoute = (id: number) => `${this.getRootRoute()}/${id}`;
  private getSignUpRoute = (id: number) => `${this.getRootRoute()}/${id}/sing-up`;
  private getUnsuscribeRoute = (id: number) => `${this.getRootRoute()}/${id}/unsubscribe`;

  getPaginated = (pagination: PaginationValues) => {
    return this.httpClient.get<PaginatedData<SportEventPaginatedPlainDTO>>(this.getRootRoute(), {
      params: this.paginationService.toHttpParams(pagination),
    });
  };

  getOne = (id: number) => {
    return this.httpClient.get<SportEventEntityPlainDTO>(this.getOneRoute(id));
  };

  createOne = (sportEvent: SportEventCreateRawDTO) => {
    return this.httpClient.post<SportEventEntityPlainDTO>(this.getRootRoute(), sportEvent);
  };

  signUp = (id: number) => {
    return this.httpClient.put<SportEventEntityPlainDTO>(this.getSignUpRoute(id), {});
  };

  unsuscribe = (id: number) => {
    return this.httpClient.put<SportEventEntityPlainDTO>(this.getUnsuscribeRoute(id), {});
  };
}
