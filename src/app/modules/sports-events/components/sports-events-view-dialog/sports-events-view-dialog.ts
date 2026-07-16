import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../shared/material/material.module';
import { SportEventPaginatedParsedDTO } from '../../models/sports-events.models';

export type SportsEventsViewDialogData = {
  event: SportEventPaginatedParsedDTO;
};

@Component({
  selector: 'app-sports-events-view-dialog',
  imports: [CommonModule, MaterialModule],
  templateUrl: './sports-events-view-dialog.html',
  styleUrl: './sports-events-view-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportsEventsViewDialog {
  private readonly dialogRef = inject<MatDialogRef<SportsEventsViewDialog>>(MatDialogRef);

  protected readonly data = inject<SportsEventsViewDialogData>(MAT_DIALOG_DATA);

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

  protected close(): void {
    this.dialogRef.close();
  }
}
