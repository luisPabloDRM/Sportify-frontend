import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../../../shared/material/material.module';
import { Router, ActivatedRoute } from '@angular/router';
import { SportsEventsDomainService } from '../../services/sports-events-domain.service';
import { SportsDomainService } from '../../../sports/services/sports-domain.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { SportEntityParsedDTO } from '../../../sports/models/sports.models';
import { SportEventCreateRawDTO } from '../../models/sports-events.models';
import { LocationSearchService } from '../../../../shared/utils/location-search/location-search.service';
import { Coordinates } from '../../../../shared/utils/location-search/location-search.models';

@Component({
  selector: 'app-sports-events-create',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './sports-events-create.html',
  styleUrl: './sports-events-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportsEventsCreate {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly location = inject(Location);
  private readonly sportsEventsDomain = inject(SportsEventsDomainService);
  private readonly sportsDomain = inject(SportsDomainService);
  private readonly toastService = inject(ToastService);
  private readonly locationSearchService = inject(LocationSearchService);

  protected readonly isLoading$ = new BehaviorSubject<boolean>(false);
  protected readonly isLoading = toSignal(this.isLoading$, { requireSync: true });

  private readonly sportIdFromRoute: number | null = (() => {
    const id = this.activatedRoute.snapshot.params['sportId'];
    return id ? Number(id) : null;
  })();

  protected readonly sports$ = this.sportsDomain
    .getAll()
    .pipe(takeUntilDestroyed(), startWith([] as SportEntityParsedDTO[]));

  protected readonly sports = toSignal(this.sports$, { requireSync: true });

  protected readonly form: FormGroup = this.fb.group({
    name:          ['', [Validators.required, Validators.maxLength(256)]],
    location:      ['', [Validators.required, Validators.maxLength(256)]],
    eventDate:     [null, [Validators.required]],
    sportId:       [this.sportIdFromRoute, [Validators.required]],
    minPlayers:    [2,  [Validators.required, Validators.min(1)]],
    maxPlayers:    [10, [Validators.required, Validators.min(1)]],
    isUserCreator: [true],
  });

  protected readonly minDate = new Date();

  protected readonly locatingMe = signal(false);
  private readonly currentCoords = signal<Coordinates | null>(null);

  protected readonly locationSuggestions = toSignal(
    (this.form.get('location') as FormControl<string>).valueChanges.pipe(
      takeUntilDestroyed(),
      debounceTime(700),
      distinctUntilChanged(),
      switchMap((value) => {
        const query = (value ?? '').trim();
        if (query.length < 3) {
          return of([]);
        }
        return this.locationSearchService
          .search(query, this.currentCoords() ?? undefined)
          .pipe(catchError(() => of([])));
      }),
    ),
    { initialValue: [] },
  );

  protected get minPlayersMax(): number {
    return this.form.get('maxPlayers')?.value ?? 99;
  }

  protected useMyLocation(): void {
    this.locatingMe.set(true);
    this.locationSearchService
      .getCurrentPosition()
      .pipe(
        switchMap((coordinates) => {
          this.currentCoords.set(coordinates);
          return this.locationSearchService.reverseGeocode(coordinates);
        }),
      )
      .subscribe({
        next: (result) => {
          this.locatingMe.set(false);
          this.form.get('location')?.setValue(result.display_name, { emitEvent: false });
        },
        error: () => {
          this.locatingMe.set(false);
          this.toastService.error('No se pudo obtener tu ubicación');
        },
      });
  }

  protected submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading$.next(true);
    const raw = this.form.getRawValue() as SportEventCreateRawDTO;

    this.sportsEventsDomain.createOne(raw).subscribe({
      next: () => {
        this.isLoading$.next(false);
        this.router.navigate([
          '/dashboard', 'sports-events', 'overview', 'sport', raw.sportId,
        ]);
      },
      error: (err) => {
        this.isLoading$.next(false);
        this.toastService.error(err?.error?.message ?? 'Error al crear el evento');
      },
    });
  }

  protected goBack() {
    this.location.back();
  }
}
