import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../shared/material/material.module';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  catchError,
  of,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { UsersDomain } from '../../services/users-domain';
import { UserPaginatedPlainDTO, UserFiltersDTO } from '../../models/users.models';
import { USER_FILTER_TYPE_PER_KEY, USER_ICON_PER_ROLE, UserRole } from '../../constants/users.constants';
import { PaginationService } from '../../../../shared/utils/pagination/pagination.service';
import { EMPTY_PAGINATED_RESPONSE } from '../../../../shared/utils/pagination/pagination.constants';
import { ResponsiveDisplayDirective } from '../../../../shared/directives/responsive-display/responsive-display.directive';
import { ResponsiveDisplayMode } from '../../../../shared/directives/responsive-display/responsive-display.constants';
import { PaginationTableSortDirective } from '../../../../shared/directives/pagination-table-sort/pagination-table-sort.directive';

@Component({
  selector: 'app-users-overview',
  imports: [
    CommonModule,
    MaterialModule,
    MatPaginatorModule,
    MatMenuModule,
    ResponsiveDisplayDirective,
    PaginationTableSortDirective,
  ],
  templateUrl: './users-overview.html',
  styleUrl: './users-overview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersOverview {
  private readonly usersDomain = inject(UsersDomain);
  private readonly paginationService = inject(PaginationService);

  protected readonly ResponsiveDisplayMode = ResponsiveDisplayMode;
  protected readonly USER_ICON_PER_ROLE = USER_ICON_PER_ROLE;
  protected readonly UserRole = UserRole;
  protected readonly columns = ['name', 'email', 'phone', 'role', 'status', 'actions'];

  protected readonly pagination = this.paginationService.fromQueryParams<UserFiltersDTO>(
    USER_FILTER_TYPE_PER_KEY,
    { sortField: 'id', sortOrder: 'asc', size: 25 },
  );

  private readonly isSendingRequest$ = new BehaviorSubject<boolean>(false);

  private readonly users$ = this.pagination.valueChanges().pipe(
    takeUntilDestroyed(),
    tap((pagination) => {
      this.paginationService.updateQueryParams(pagination);
      this.isSendingRequest$.next(true);
    }),
    switchMap((pagination) =>
      this.usersDomain.getPaginated(pagination).pipe(
        catchError(() => of(EMPTY_PAGINATED_RESPONSE)),
      ),
    ),
    startWith(EMPTY_PAGINATED_RESPONSE),
    tap(() => this.isSendingRequest$.next(false)),
    shareReplay(1),
  );

  protected readonly vm = Object.freeze({
    isSendingRequest: toSignal(this.isSendingRequest$, { requireSync: true }),
    users: toSignal(this.users$, { requireSync: true }),
  });

  protected onPageChange(event: PageEvent): void {
    this.pagination.paginate(event.pageIndex + 1, event.pageSize);
  }

  protected roleIcon(roleName: string): string {
    return USER_ICON_PER_ROLE[roleName as UserRole] ?? 'person';
  }

  protected enrichUser(user: UserPaginatedPlainDTO) {
    return {
      ...user,
      statusLabel: user.isEnabled ? 'Activo' : 'Inactivo',
      statusClass: user.isEnabled ? 'status-active' : 'status-inactive',
    };
  }
}
