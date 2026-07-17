import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../shared/material/material.module';
import { SportsEventsDomainService } from '../../services/sports-events-domain.service';
import { SportsDomainService } from '../../../sports/services/sports-domain.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { SportEntityParsedDTO } from '../../../sports/models/sports.models';
import { SportEventPaginatedParsedDTO, SportEventUpdateRawDTO } from '../../models/sports-events.models';
import { DateTime } from 'luxon';
import { LocationSearchService } from '../../../../shared/utils/location-search/location-search.service';
import { Coordinates } from '../../../../shared/utils/location-search/location-search.models';

export type SportsEventsEditDialogData = {
  event: SportEventPaginatedParsedDTO;
};

export type SportsEventsEditDialogResult = { updated: boolean } | undefined;

@Component({
  selector: 'app-sports-events-edit-dialog',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './sports-events-edit-dialog.html',
  styleUrl: './sports-events-edit-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportsEventsEditDialog {
  private readonly dialogRef = inject<MatDialogRef<SportsEventsEditDialog, SportsEventsEditDialogResult>>(MatDialogRef);
  private readonly fb = inject(FormBuilder);
  private readonly domainService = inject(SportsEventsDomainService);
  private readonly sportsDomain = inject(SportsDomainService);
  private readonly toastService = inject(ToastService);
  private readonly locationSearchService = inject(LocationSearchService);

  protected readonly data = inject<SportsEventsEditDialogData>(MAT_DIALOG_DATA);

  private readonly isLoading$ = new BehaviorSubject<boolean>(false);
  protected readonly isLoading = toSignal(this.isLoading$, { requireSync: true });

  protected readonly sports$ = this.sportsDomain
    .getAll()
    .pipe(takeUntilDestroyed(), startWith([] as SportEntityParsedDTO[]));

  protected readonly sports = toSignal(this.sports$, { requireSync: true });

  protected readonly minDate = new Date();

  protected readonly form: FormGroup = (() => {
    const ev = this.data.event;
    const rawDate = ev.eventDate as unknown as string;
    const eventDateJs = rawDate
      ? DateTime.fromISO(rawDate).toJSDate()
      : null;

    return this.fb.group({
      name:       [ev.name,       [Validators.required, Validators.maxLength(256)]],
      location:   [ev.location,   [Validators.required, Validators.maxLength(256)]],
      eventDate:  [eventDateJs,   [Validators.required]],
      sportId:    [ev.sportId,    [Validators.required]],
      minPlayers: [ev.minPlayers, [Validators.required, Validators.min(1)]],
      maxPlayers: [ev.maxPlayers, [Validators.required, Validators.min(1)]],
    });
  })();

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

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading$.next(true);
    const raw = this.form.getRawValue() as SportEventUpdateRawDTO;

    this.domainService.updateOne(this.data.event.id, raw).subscribe({
      next: () => {
        this.isLoading$.next(false);
        this.toastService.success('Evento actualizado correctamente');
        this.dialogRef.close({ updated: true });
      },
      error: (err) => {
        this.isLoading$.next(false);
        this.toastService.error(err?.error?.message ?? 'Error al actualizar el evento');
      },
    });
  }

  protected cancel(): void {
    this.dialogRef.close({ updated: false });
  }
}
