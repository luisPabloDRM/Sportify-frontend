import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../shared/material/material.module';
import { SportsDomainService } from '../../../sports/services/sports-domain.service';
import { catchError, of, startWith } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { SportEntityParsedDTO } from '../../../sports/models/sports.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sports-events-dashboard',
  imports: [CommonModule, MaterialModule],
  templateUrl: './sports-events-dashboard.html',
  styleUrl: './sports-events-dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportsEventsDashboard {
  protected sportsDomain = inject(SportsDomainService);
  protected router = inject(Router);

  protected readonly sports$ = this.sportsDomain
    .getAll()
    .pipe(
      takeUntilDestroyed(),
      catchError(() => of([] as SportEntityParsedDTO[])),
      startWith([] as SportEntityParsedDTO[]),
    );

  protected goToSport(sport: SportEntityParsedDTO) {
    this.router.navigate(['/dashboard', 'sports-events', 'overview', 'sport', sport.id]);
  }

  protected vm = Object.freeze({
    sports: toSignal(this.sports$, { requireSync: true }),
  });
}
