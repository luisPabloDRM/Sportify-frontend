import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { MaterialModule } from '../../../../../shared/material/material.module';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { PaginationTableSortDirective } from '../../../../../shared/directives/pagination-table-sort/pagination-table-sort.directive';
import { ResponsiveDisplayDirective } from '../../../../../shared/directives/responsive-display/responsive-display.directive';
import { Pagination } from '../../../../../shared/utils/pagination/pagination.models';
import { SportEventFilterDTO, SportEventPaginatedParsedDTO } from '../../../models/sports-events.models';
import { ResponsiveDisplayMode } from '../../../../../shared/directives/responsive-display/responsive-display.constants';
import { MatDialog } from '@angular/material/dialog';
import { SportsEventsJoinDialog, SportsEventsJoinDialogData, SportsEventsJoinDialogResult } from '../../sports-events-join-dialog/sports-events-join-dialog';
import { AuthUser } from '../../../../../core/services/auth-user/auth-user';

@Component({
  selector: 'app-sports-events-overview-items',
  imports: [
    MaterialModule,
    CommonModule,
    MatMenuModule,
    PaginationTableSortDirective,
    ResponsiveDisplayDirective,
  ],
  templateUrl: './sports-events-overview-items.html',
  styleUrl: './sports-events-overview-items.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportsEventsOverviewItems {
  protected readonly matDialog = inject(MatDialog);
  private readonly authUser = inject(AuthUser);

  readonly isSendingRequest = input.required<boolean>();
  readonly pagination = input.required<Pagination<SportEventFilterDTO>>();
  readonly sportsEvents = input.required<SportEventPaginatedParsedDTO[]>();
  readonly loading = input.required<boolean>();

  readonly joined = output<void>();

  protected readonly ResponsiveDisplayMode = ResponsiveDisplayMode;
  protected readonly columns = ['name', 'location', 'eventDate', 'players', 'enrolled', 'status', 'actions'];

  /** Enriquece cada evento con conteo de apuntados, estado y si el usuario actual es creador */
  protected readonly enrichedEvents = computed(() => {
    const currentUserId = this.authUser.get()?.user.id;

    return this.sportsEvents().map((event) => {
      const enrolled = event.users?.length ?? 0;
      const max = event.maxPlayers;
      const min = event.minPlayers;

      let statusLabel: string;
      let statusClass: string;

      if (enrolled >= max) {
        statusLabel = 'Completo';
        statusClass = 'status-full';
      } else if (enrolled >= max - Math.ceil(max * 0.25)) {
        statusLabel = 'Casi lleno';
        statusClass = 'status-almost';
      } else if (enrolled >= min) {
        statusLabel = 'Confirmado';
        statusClass = 'status-confirmed';
      } else {
        statusLabel = 'Disponible';
        statusClass = 'status-open';
      }

      const isCurrentUserCreator = currentUserId != null &&
        (event.users ?? []).some((u) => u.id === currentUserId && u.isUserCreator === true);

      return { ...event, enrolled, statusLabel, statusClass, isCurrentUserCreator };
    });
  });

  protected openJoinDialog(event: SportEventPaginatedParsedDTO): void {
    const data: SportsEventsJoinDialogData = { event };
    this.matDialog
      .open<SportsEventsJoinDialog, SportsEventsJoinDialogData, SportsEventsJoinDialogResult>(
        SportsEventsJoinDialog,
        { data, width: '500px', autoFocus: false },
      )
      .afterClosed()
      .subscribe((result) => {
        if (result?.joined) {
          this.joined.emit();
        }
      });
  }
}
