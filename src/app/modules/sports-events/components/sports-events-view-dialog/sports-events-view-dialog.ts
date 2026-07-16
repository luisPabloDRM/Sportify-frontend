import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../shared/material/material.module';
import { SportEventPaginatedParsedDTO } from '../../models/sports-events.models';
import { SportsEventsApiService } from '../../services/sports-events-api.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';

export type SportsEventsViewDialogData = {
  event: SportEventPaginatedParsedDTO;
  isCreator: boolean;
};

export type SportsEventsViewDialogResult = { attendanceChanged: boolean };

type Participant = SportEventPaginatedParsedDTO['users'][number];

@Component({
  selector: 'app-sports-events-view-dialog',
  imports: [CommonModule, MaterialModule],
  templateUrl: './sports-events-view-dialog.html',
  styleUrl: './sports-events-view-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportsEventsViewDialog {
  private readonly dialogRef =
    inject<MatDialogRef<SportsEventsViewDialog, SportsEventsViewDialogResult>>(MatDialogRef);
  private readonly apiService = inject(SportsEventsApiService);
  private readonly toastService = inject(ToastService);

  protected readonly data = inject<SportsEventsViewDialogData>(MAT_DIALOG_DATA);

  protected readonly participants = signal<Participant[]>(this.data.event.users ?? []);
  protected readonly markingId = signal<number | null>(null);
  private attendanceChanged = false;

  protected get enrolled(): number {
    return this.participants().length;
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

  protected toggleAttendance(participant: Participant): void {
    if (this.markingId() !== null) return;

    const attended = !participant.attended;
    this.markingId.set(participant.id);

    this.apiService.markAttendance(this.data.event.id, participant.id, attended).subscribe({
      next: () => {
        this.markingId.set(null);
        this.attendanceChanged = true;
        this.participants.update((list) =>
          list.map((p) =>
            p.id === participant.id
              ? { ...p, attended, points: Math.max(0, (p.points ?? 0) + (attended ? 1 : -1)) }
              : p,
          ),
        );
      },
      error: (err) => {
        this.markingId.set(null);
        this.toastService.error(err?.error?.message ?? 'Error al actualizar la asistencia');
      },
    });
  }

  protected close(): void {
    this.dialogRef.close({ attendanceChanged: this.attendanceChanged });
  }
}
