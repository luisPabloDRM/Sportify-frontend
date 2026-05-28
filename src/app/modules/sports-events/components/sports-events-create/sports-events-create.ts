import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
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
import { BehaviorSubject, startWith } from 'rxjs';
import { SportEntityParsedDTO } from '../../../sports/models/sports.models';
import { SportEventCreateRawDTO } from '../../models/sports-events.models';

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

  protected get minPlayersMax(): number {
    return this.form.get('maxPlayers')?.value ?? 99;
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
