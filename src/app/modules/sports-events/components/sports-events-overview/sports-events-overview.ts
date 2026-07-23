import { CommonModule, Location } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { DateTime } from 'luxon';
import { MaterialModule } from '../../../../shared/material/material.module';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  of,
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
import { SportEventFilterDTO, SportEventPaginatedParsedDTO } from '../../models/sports-events.models';
import { SPORT_EVENT_FILTER_TYPES } from '../../constants/sports_events.constants';
import { SportsEventsDomainService } from '../../services/sports-events-domain.service';
import { EMPTY_PAGINATED_RESPONSE } from '../../../../shared/utils/pagination/pagination.constants';
import { SportsEventsOverviewItems } from './sports-events-overview-items/sports-events-overview-items';
import { SearchDirective } from '../../../../shared/directives/search/search.directive';

@Component({
  selector: 'app-sports-events-overview',
  imports: [
    CommonModule,
    MaterialModule,
    MatPaginatorModule,
    SportsEventsOverviewItems,
    SearchDirective,
  ],
  templateUrl: './sports-events-overview.html',
  styleUrl: './sports-events-overview.scss',
})
export class SportsEventsOverview {
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly toastService = inject(ToastService);
  protected readonly location = inject(Location);
  protected readonly paginationService = inject(PaginationService);
  protected readonly sportEventDomainService = inject(SportsEventsDomainService);
  protected readonly router = inject(Router);

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
    { sortField: 'id', sortOrder: 'asc', size: 50 },
  );

  /** Valor inicial del filtro por nombre (desde la URL). No se actualiza tras el primer render
   *  para no pisar lo que el usuario esté escribiendo mientras llega la respuesta del filtro. */
  protected readonly initialNameFilter = this.pagination.value.filters.name ?? '';

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
      }).pipe(
        catchError(() => of(EMPTY_PAGINATED_RESPONSE)),
      ),
    ),
    tap((value) => console.log("Sport Event, ", value)),
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
    isSendingRequest: toSignal(this.isSendingRequest$, { requireSync: true }),
    pagination: this.pagination,
    sportEvents: toSignal(this.sportsEvents$, { requireSync: true }),
    sports: toSignal(this.sports$, { requireSync: true }),
  });

  protected readonly upcomingEvents = computed(() =>
    this.vm.sportEvents().data.filter((event) => !this.isPastEvent(event)),
  );

  protected readonly pastEvents = computed(() =>
    this.vm.sportEvents().data.filter((event) => this.isPastEvent(event)),
  );

  protected readonly hasBothEventTypes = computed(
    () => this.upcomingEvents().length > 0 && this.pastEvents().length > 0,
  );

  protected readonly singleListEvents = computed(() =>
    this.pastEvents().length > 0 ? this.pastEvents() : this.upcomingEvents(),
  );

  private isPastEvent(event: SportEventPaginatedParsedDTO): boolean {
    const rawDate = event.eventDate as unknown as string;
    return DateTime.fromISO(rawDate) < DateTime.now();
  }

  protected onPageChange(event: PageEvent) {
    this.pagination.paginate(event.pageIndex + 1, event.pageSize);
  }

  protected onSearchByName(value: string): void {
    const name = value.trim();
    this.pagination.filter(name ? { name } : {});
  }

  protected create() {
    const path = ['/dashboard', 'sports-events', 'create', 'sport', this.vm.sports().id];
    this.router.navigate(path);
  }

  protected refresh() {
    this.refreshPagination.next();
  }
}
