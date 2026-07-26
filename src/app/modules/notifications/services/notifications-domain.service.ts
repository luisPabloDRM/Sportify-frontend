import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsApiService } from './notifications-api.service';
import { Domain } from '../../../core/services/domain/domain';
import { ToastService } from '../../../shared/components/toast/toast.service';
import {
  PaginatedData,
  PaginationValues,
} from '../../../shared/utils/pagination/pagination.models';
import {
  NotificationEntityParsedDTO,
  NotificationEntityPlainDTO,
} from '../models/notifications.models';
import * as R from 'remeda';

@Injectable({
  providedIn: 'root',
})
export class NotificationsDomainService {
  protected readonly notificationsApiService = inject(NotificationsApiService);
  protected readonly domainService = inject(Domain);
  protected readonly toastService = inject(ToastService);

  getPaginated = (
    pagination: PaginationValues,
  ): Observable<PaginatedData<NotificationEntityParsedDTO>> => {
    return this.notificationsApiService.getPaginated(pagination).pipe(
      map((paginated) => ({
        ...paginated,
        data: R.map(paginated.data, (notification) => this.transformPlainToParsed(notification)),
      })),
      tap({
        error: (error: HttpErrorResponse) => {
          const message = error.error?.message ?? 'Error al cargar las notificaciones.';
          this.toastService.error(message);
        },
      }),
    );
  };

  markAsRead = (id: number): Observable<NotificationEntityParsedDTO> => {
    return this.notificationsApiService.markAsRead(id).pipe(
      map((notification) => this.transformPlainToParsed(notification)),
      tap({
        error: (error: HttpErrorResponse) => {
          const message = error.error?.message ?? 'Error al marcar la notificación como leída.';
          this.toastService.error(message);
        },
      }),
    );
  };

  markAllAsRead = (): Observable<{ success: boolean }> => {
    return this.notificationsApiService.markAllAsRead().pipe(
      tap({
        error: (error: HttpErrorResponse) => {
          const message =
            error.error?.message ?? 'Error al marcar las notificaciones como leídas.';
          this.toastService.error(message);
        },
      }),
    );
  };

  getUnreadCountSilently = (): Observable<number> => {
    return this.notificationsApiService.getUnreadCount().pipe(
      map((response) => response.count),
      catchError(() => of(0)),
    );
  };

  private transformPlainToParsed = (
    plain: NotificationEntityPlainDTO,
  ): NotificationEntityParsedDTO => {
    const dates = this.domainService.parseCommonEntityAttributes(plain);
    return R.merge(plain, dates);
  };
}
