import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, switchMap, tap, timer } from 'rxjs';
import { NotificationsDomainService } from './notifications-domain.service';
import { AuthUser } from '../../../core/services/auth-user/auth-user';

const POLLING_INTERVAL_MS = 25000;

@Injectable({
  providedIn: 'root',
})
export class NotificationsPollingService {
  private readonly notificationsDomain = inject(NotificationsDomainService);
  private readonly authUser = inject(AuthUser);

  readonly unreadCount = signal(0);

  protected readonly poll$ = timer(0, POLLING_INTERVAL_MS).pipe(
    filter(() => !!this.authUser.get()),
    switchMap(() => this.notificationsDomain.getUnreadCountSilently()),
    tap((count) => this.unreadCount.set(count)),
    takeUntilDestroyed(),
  );

  protected readonly autosuscribe = this.poll$.subscribe();

  refreshNow = () => {
    this.notificationsDomain.getUnreadCountSilently().subscribe((count) => {
      this.unreadCount.set(count);
    });
  };
}
