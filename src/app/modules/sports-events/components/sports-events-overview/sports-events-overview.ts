import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../shared/material/material.module';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { SportEntityParsedDTO } from '../../../sports/models/sports.models';
import * as R from 'remeda';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { PaginationService } from '../../../../shared/utils/pagination/pagination.service';
import { SportEventFilterDTO } from '../../models/sports-events.models';

@Component({
  selector: 'app-sports-events-overview',
  imports: [CommonModule, MaterialModule],
  templateUrl: './sports-events-overview.html',
  styleUrl: './sports-events-overview.scss',
})
export class SportsEventsOverview {
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly toastService = inject(ToastService);
  protected readonly location = inject(Location)
  protected readonly paginationService = inject(PaginationService);

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

  protected readonly pagination = this.paginationService.fromQueryParams<SportEventFilterDTO>()

}
