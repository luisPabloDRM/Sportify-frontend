import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthUser } from '../../services/auth-user/auth-user';
import { AuthenticationDomain } from '../../../modules/authentication/services/authentication-domain';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { Permission } from '../../../modules/roles/constants/roles.constants';
import { NotificationsPollingService } from '../../../modules/notifications/services/notifications-polling.service';
import { NotificationsDomainService } from '../../../modules/notifications/services/notifications-domain.service';
import { NotificationEntityParsedDTO } from '../../../modules/notifications/models/notifications.models';
import { NotificationType } from '../../../modules/notifications/constants/notifications.constants';

const NOTIFICATION_ICONS: Record<NotificationType, string> = {
  [NotificationType.EventUpdated]: 'edit_calendar',
  [NotificationType.UserJoined]: 'person_add',
  [NotificationType.UserLeft]: 'person_remove',
  [NotificationType.EventFull]: 'event_busy',
  [NotificationType.EventAvailable]: 'event_available',
};

@Component({
  selector: 'app-layout-header',
  imports: [
    CommonModule,
    MaterialModule,
    RouterLink,
    RouterLinkActive,
    MatMenuModule,
    MatBadgeModule,
  ],
  templateUrl: './layout-header.html',
  styleUrl: './layout-header.scss',
})
export class LayoutHeader {
  private readonly authUser = inject(AuthUser);
  private readonly authDomain = inject(AuthenticationDomain);
  protected readonly notificationsPolling = inject(NotificationsPollingService);
  private readonly notificationsDomain = inject(NotificationsDomainService);

  isMenuOpen = false;
  protected readonly notifications = signal<NotificationEntityParsedDTO[]>([]);
  protected readonly unreadCount = this.notificationsPolling.unreadCount;

  protected get user() {
    return this.authUser.get()?.user ?? null;
  }

  protected get isAdmin(): boolean {
    return this.authUser.hasPermission(Permission.ReadUsers);
  }

  /** Devuelve las iniciales del nombre completo (máx. 2 letras) */
  protected get initials(): string {
    const name = this.user?.fullname ?? '';
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  protected logOut() {
    this.authDomain.logOut();
  }

  protected onNotifMenuOpened() {
    this.notificationsDomain
      .getPaginated({ page: 1, size: 10, sortField: 'createdAt', sortOrder: 'desc', filters: {} })
      .subscribe((paginated) => this.notifications.set(paginated.data));
  }

  protected onNotificationClick(notification: NotificationEntityParsedDTO) {
    if (notification.read) {
      return;
    }
    this.notificationsDomain.markAsRead(notification.id).subscribe((updated) => {
      this.notifications.update((list) =>
        list.map((item) => (item.id === updated.id ? updated : item)),
      );
      this.notificationsPolling.refreshNow();
    });
  }

  protected markAllAsRead(event: Event) {
    event.stopPropagation();
    this.notificationsDomain.markAllAsRead().subscribe(() => {
      this.notifications.update((list) => list.map((item) => ({ ...item, read: true })));
      this.notificationsPolling.refreshNow();
    });
  }

  protected iconFor(type: NotificationType): string {
    return NOTIFICATION_ICONS[type] ?? 'notifications';
  }

  protected relativeTime(date: NotificationEntityParsedDTO['createdAt']): string {
    return date.setLocale('es').toRelative() ?? '';
  }
}
