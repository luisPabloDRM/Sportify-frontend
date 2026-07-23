import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../shared/material/material.module';
import { SportsDomainService } from '../../../sports/services/sports-domain.service';
import { BehaviorSubject, catchError, of, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { SportEntityParsedDTO } from '../../../sports/models/sports.models';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  SportsCreateDialog,
  SportsCreateDialogResult,
} from '../../../sports/components/sports-create-dialog/sports-create-dialog';
import { RequirePermissionDirective } from '../../../../shared/directives/require-permission/require-permission.directive';
import { Permission } from '../../../roles/constants/roles.constants';

@Component({
  selector: 'app-sports-events-dashboard',
  imports: [CommonModule, MaterialModule, RequirePermissionDirective],
  templateUrl: './sports-events-dashboard.html',
  styleUrl: './sports-events-dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportsEventsDashboard {
  protected sportsDomain = inject(SportsDomainService);
  protected router = inject(Router);
  protected matDialog = inject(MatDialog);

  protected readonly Permission = Permission;

  private readonly refreshSports$ = new BehaviorSubject<void>(undefined);

  protected readonly sports$ = this.refreshSports$.pipe(
    switchMap(() =>
      this.sportsDomain.getAll().pipe(catchError(() => of([] as SportEntityParsedDTO[]))),
    ),
    startWith([] as SportEntityParsedDTO[]),
    takeUntilDestroyed(),
  );

  protected goToSport(sport: SportEntityParsedDTO) {
    this.router.navigate(['/dashboard', 'sports-events', 'overview', 'sport', sport.id]);
  }

  protected openCreateSportDialog(): void {
    this.matDialog
      .open<SportsCreateDialog, undefined, SportsCreateDialogResult>(SportsCreateDialog, {
        width: '420px',
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result?.created) {
          this.refreshSports$.next();
        }
      });
  }

  protected vm = Object.freeze({
    sports: toSignal(this.sports$, { requireSync: true }),
  });
}
