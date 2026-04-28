import { SportOrderAction } from './../../../constants/sports_events.constants';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MaterialModule } from '../../../../../shared/material/material.module';
import { CommonModule } from '@angular/common';
import { ChipDirective } from '../../../../../shared/directives/chip/chip.directive';
import { MatMenuModule } from '@angular/material/menu';
import { PaginationTableSortDirective } from '../../../../../shared/directives/pagination-table-sort/pagination-table-sort.directive';
import { CellNoDataDirective } from '../../../../../shared/directives/cell-no-data/cell-no-data.directive';
import { CompactCellDirective } from '../../../../../shared/directives/compact-cell/compact-cell.directive';
import { ResponsiveDisplayDirective } from '../../../../../shared/directives/responsive-display/responsive-display.directive';
import { Pagination } from '../../../../../shared/utils/pagination/pagination.models';
import { SportEventFilterDTO, SportEventPaginatedParsedDTO } from '../../../models/sports-events.models';
import { ResponsiveDisplayMode } from '../../../../../shared/directives/responsive-display/responsive-display.constants';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sports-events-overview-items',
  imports: [
    MaterialModule,
    CommonModule,
    ChipDirective,
    MatMenuModule,
    PaginationTableSortDirective,
    CellNoDataDirective,
    CompactCellDirective,
    ResponsiveDisplayDirective,
  ],
  templateUrl: './sports-events-overview-items.html',
  styleUrl: './sports-events-overview-items.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportsEventsOverviewItems {
  protected readonly matDialog = inject(MatDialog);
  protected readonly router = inject(Router);
  readonly isSendingRequest = input.required<boolean>();
  readonly pagination = input.required<Pagination<SportEventFilterDTO>>();
  readonly sportsEvents = input.required<SportEventPaginatedParsedDTO[]>();
  // readonly action = output<SportOrderAction>();
  readonly loading = input.required<boolean>();

  protected readonly ResponsiveDisplayMode = ResponsiveDisplayMode;

  protected readonly columns = ['name', 'location', 'eventDate', 'players', 'status', 'actions'];

  //TODO: Hacer observables para calcular el estado de la actividad si libre u ocupado
}
