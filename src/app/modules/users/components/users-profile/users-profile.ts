import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../shared/material/material.module';
import { UsersDomain } from '../../services/users-domain';
import { UserEntityParsedDTO } from '../../models/users.models';
import { USER_COLOR_PER_ROLE, USER_ICON_PER_ROLE, UserRole } from '../../constants/users.constants';

@Component({
  selector: 'app-users-profile',
  imports: [CommonModule, MaterialModule],
  templateUrl: './users-profile.html',
  styleUrl: './users-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersProfile {
  private readonly usersDomain = inject(UsersDomain);

  protected readonly user = signal<UserEntityParsedDTO | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  protected readonly USER_ICON_PER_ROLE = USER_ICON_PER_ROLE;
  protected readonly USER_COLOR_PER_ROLE = USER_COLOR_PER_ROLE;
  protected readonly UserRole = UserRole;

  constructor() {
    this.usersDomain.getProfile().subscribe({
      next: (user) => {
        this.user.set(user);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  protected get initials(): string {
    const u = this.user();
    if (!u) return '';
    return (u.firstname.charAt(0) + u.lastname.charAt(0)).toUpperCase();
  }

  protected roleIcon(roleName: string): string {
    return USER_ICON_PER_ROLE[roleName as UserRole] ?? 'person';
  }
}
