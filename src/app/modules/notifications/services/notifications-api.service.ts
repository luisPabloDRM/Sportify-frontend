import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  PaginatedData,
  PaginationValues,
} from '../../../shared/utils/pagination/pagination.models';
import { PaginationService } from '../../../shared/utils/pagination/pagination.service';
import { Api } from '../../../core/services/api/api';
import { NotificationEntityPlainDTO } from '../models/notifications.models';

@Injectable({
  providedIn: 'root',
})
export class NotificationsApiService {
  protected readonly httpClient = inject(HttpClient);
  protected readonly paginationService = inject(PaginationService);
  protected readonly apiService = inject(Api);

  private getRootRoute = () => `${this.apiService.getRoot()}/notifications`;
  private getUnreadCountRoute = () => `${this.getRootRoute()}/unread-count`;
  private getMarkAsReadRoute = (id: number) => `${this.getRootRoute()}/${id}/read`;
  private getMarkAllAsReadRoute = () => `${this.getRootRoute()}/read-all`;

  getPaginated = (pagination: PaginationValues) => {
    return this.httpClient.get<PaginatedData<NotificationEntityPlainDTO>>(this.getRootRoute(), {
      params: this.paginationService.toHttpParams(pagination),
    });
  };

  getUnreadCount = () => {
    return this.httpClient.get<{ count: number }>(this.getUnreadCountRoute());
  };

  markAsRead = (id: number) => {
    return this.httpClient.put<NotificationEntityPlainDTO>(this.getMarkAsReadRoute(id), {});
  };

  markAllAsRead = () => {
    return this.httpClient.put<{ success: boolean }>(this.getMarkAllAsReadRoute(), {});
  };
}
