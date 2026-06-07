import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../shared/material/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SportsEventsApiService } from '../../services/sports-events-api.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { BehaviorSubject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { SportEventPaginatedParsedDTO } from '../../models/sports-events.models';

export type SportsEventsJoinDialogData = {
  event: SportEventPaginatedParsedDTO;
};

export type SportsEventsJoinDialogResult = { joined: boolean };

@Component({
  selector: 'app-sports-events-join-dialog',
  imports: [CommonModule, MaterialModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './sports-events-join-dialog.html',
  styleUrl: './sports-events-join-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportsEventsJoinDialog {
  private readonly dialogRef = inject<MatDialogRef<SportsEventsJoinDialog, SportsEventsJoinDialogResult>>(MatDialogRef);
  private readonly apiService = inject(SportsEventsApiService);
  private readonly toastService = inject(ToastService);

  protected readonly data = inject<SportsEventsJoinDialogData>(MAT_DIALOG_DATA);

  private readonly isLoading$ = new BehaviorSubject<boolean>(false);
  protected readonly isLoading = toSignal(this.isLoading$, { requireSync: true });

  protected get enrolled(): number {
    return this.data.event.users?.length ?? 0;
  }

  protected get isFull(): boolean {
    return this.enrolled >= this.data.event.maxPlayers;
  }

  protected get statusLabel(): string {
    const { maxPlayers, minPlayers } = this.data.event;
    const e = this.enrolled;
    if (e >= maxPlayers) return 'Completo';
    if (e >= maxPlayers - Math.ceil(maxPlayers * 0.25)) return 'Casi lleno';
    if (e >= minPlayers) return 'Confirmado';
    return 'Disponible';
  }

  protected get statusClass(): string {
    const { maxPlayers, minPlayers } = this.data.event;
    const e = this.enrolled;
    if (e >= maxPlayers) return 'status-full';
    if (e >= maxPlayers - Math.ceil(maxPlayers * 0.25)) return 'status-almost';
    if (e >= minPlayers) return 'status-confirmed';
    return 'status-open';
  }

  protected join(): void {
    this.isLoading$.next(true);
    this.apiService.signUp(this.data.event.id).subscribe({
      next: () => {
        this.isLoading$.next(false);
        this.toastService.success('Te has apuntado al evento correctamente');
        this.dialogRef.close({ joined: true });
      },
      error: (err) => {
        this.isLoading$.next(false);
        this.toastService.error(err?.error?.message ?? 'Error al apuntarse al evento');
      },
    });
  }

  protected cancel(): void {
    this.dialogRef.close({ joined: false });
  }
}
