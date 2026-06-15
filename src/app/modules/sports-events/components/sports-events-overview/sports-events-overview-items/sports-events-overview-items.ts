import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
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
import { SportsEventsEditDialog, SportsEventsEditDialogData, SportsEventsEditDialogResult } from '../../sports-events-edit-dialog/sports-events-edit-dialog';
import { AuthUser } from '../../../../../core/services/auth-user/auth-user';
import { SportsEventsApiService } from '../../../services/sports-events-api.service';
import { ToastService } from '../../../../../shared/components/toast/toast.service';

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
  private readonly apiService = inject(SportsEventsApiService);
  private readonly toastService = inject(ToastService);

  readonly isSendingRequest = input.required<boolean>();
  readonly pagination = input.required<Pagination<SportEventFilterDTO>>();
  readonly sportsEvents = input.required<SportEventPaginatedParsedDTO[]>();
  readonly loading = input.required<boolean>();

  readonly joined = output<void>();

  /** ID del evento que está procesando la baja en este momento (evita dobles clics) */
  protected readonly unsubscribingId = signal<number | null>(null);

  protected readonly ResponsiveDisplayMode = ResponsiveDisplayMode;
  protected readonly columns = ['name', 'location', 'eventDate', 'players', 'enrolled', 'status', 'actions'];

  /** Enriquece cada evento con estado, flags de usuario actual (creador / suscrito) */
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
        (event.users ?? []).some((u) => u.id === currentUserId && !!u.isUserCreator);

      const isCurrentUserSubscribed = currentUserId != null &&
        (event.users ?? []).some((u) => u.id === currentUserId);

      return { ...event, enrolled, statusLabel, statusClass, isCurrentUserCreator, isCurrentUserSubscribed };
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

  protected openEditDialog(event: SportEventPaginatedParsedDTO): void {
    const data: SportsEventsEditDialogData = { event };
    this.matDialog
      .open<SportsEventsEditDialog, SportsEventsEditDialogData, SportsEventsEditDialogResult>(
        SportsEventsEditDialog,
        { data, width: '560px', autoFocus: false },
      )
      .afterClosed()
      .subscribe((result) => {
        if (result?.updated) {
          this.joined.emit();
        }
      });
  }

  protected unsubscribe(event: SportEventPaginatedParsedDTO): void {
    if (this.unsubscribingId() !== null) return;
    this.unsubscribingId.set(event.id);

    this.apiService.unsuscribe(event.id).subscribe({
      next: () => {
        this.unsubscribingId.set(null);
        this.toastService.success('Te has desapuntado del evento correctamente');
        this.joined.emit();
      },
      error: (err) => {
        this.unsubscribingId.set(null);
        this.toastService.error(err?.error?.message ?? 'Error al desapuntarse del evento');
      },
    });
  }
}
