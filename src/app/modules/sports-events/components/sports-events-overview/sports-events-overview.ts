import { CommonModule, Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MaterialModule } from '../../../../shared/material/material.module';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  combineLatest,
  map,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { SportEntityParsedDTO } from '../../../sports/models/sports.models';
import * as R from 'remeda';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { PaginationService } from '../../../../shared/utils/pagination/pagination.service';
import { SportEventFilterDTO } from '../../models/sports-events.models';
import { SPORT_EVENT_FILTER_TYPES } from '../../constants/sports_events.constants';
import { SportsEventsDomainService } from '../../services/sports-events-domain.service';
import { EMPTY_PAGINATED_RESPONSE } from '../../../../shared/utils/pagination/pagination.constants';

@Component({
  selector: 'app-sports-events-overview',
  imports: [CommonModule, MaterialModule],
  templateUrl: './sports-events-overview.html',
  styleUrl: './sports-events-overview.scss',
})
export class SportsEventsOverview {
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly toastService = inject(ToastService);
  protected readonly location = inject(Location);
  protected readonly paginationService = inject(PaginationService);
  protected readonly sportEventDomainService = inject(SportsEventsDomainService);

  protected readonly sports$ = this.activatedRoute.data.pipe(
    takeUntilDestroyed(),
    map((data) => (data['sport'] as SportEntityParsedDTO) ?? undefined),
    tap((sport) => {
      if (!R.isNonNullish(sport)) {
        this.toastService.error('En la ruta no aparece un deporte');
        this.location.back();
      }
    }),
  );

  protected readonly pagination = this.paginationService.fromQueryParams<SportEventFilterDTO>(
    SPORT_EVENT_FILTER_TYPES,
    { sortField: 'id', sortOrder: 'asc' },
  );

  private readonly refreshPagination = new Subject<void>();

  protected readonly isSendingRequest$ = new BehaviorSubject<boolean>(false);

  protected readonly loading = signal<boolean>(false);

  protected readonly sportsEvents$ = combineLatest({
    pagination: this.pagination.valueChanges(),
    sport: this.sports$,
  }).pipe(
    takeUntilDestroyed(),
    tap(({ pagination }) => {
      this.paginationService.updateQueryParams(pagination);
      this.isSendingRequest$.next(true);
    }),
    switchMap(({ pagination, sport }) =>
      this.sportEventDomainService.getPaginated({
        ...pagination,
        filters: { ...pagination.filters, sportId: sport.id },
      }),
    ),
    startWith(EMPTY_PAGINATED_RESPONSE),
    tap(() => this.isSendingRequest$.next(false)),
    shareReplay(1),
  );

  private readonly refreshPagination$ = this.refreshPagination.asObservable().pipe(
    takeUntilDestroyed(),
    tap(() => this.pagination.paginate(1, this.pagination.value.size)),
  );

  protected readonly autosuscribe = combineLatest([this.refreshPagination$])
    .pipe(takeUntilDestroyed())
    .subscribe();

  protected readonly vm = Object.freeze({
    isSendingRequest: toSignal(this.isSendingRequest$, {requireSync: true}),
    pagination: this.pagination,
    sportEvents : toSignal(this.sportsEvents$, {requireSync: true}),
    sports: toSignal(this.sports$, {requireSync: true})
  })
}
