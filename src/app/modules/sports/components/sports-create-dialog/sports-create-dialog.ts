import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../shared/material/material.module';
import { SportsDomainService } from '../../services/sports-domain.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { BehaviorSubject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { SportEntityParsedDTO } from '../../models/sports.models';

export type SportsCreateDialogResult = { created: boolean; sport?: SportEntityParsedDTO };

@Component({
  selector: 'app-sports-create-dialog',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './sports-create-dialog.html',
  styleUrl: './sports-create-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportsCreateDialog {
  private readonly dialogRef =
    inject<MatDialogRef<SportsCreateDialog, SportsCreateDialogResult>>(MatDialogRef);
  private readonly fb = inject(FormBuilder);
  private readonly sportsDomain = inject(SportsDomainService);
  private readonly toastService = inject(ToastService);

  private readonly isLoading$ = new BehaviorSubject<boolean>(false);
  protected readonly isLoading = toSignal(this.isLoading$, { requireSync: true });

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(256)]],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading$.next(true);
    const { name } = this.form.getRawValue();

    this.sportsDomain.createOne({ name: name! }).subscribe({
      next: (sport) => {
        this.isLoading$.next(false);
        this.toastService.success('Deporte creado correctamente');
        this.dialogRef.close({ created: true, sport });
      },
      error: (err) => {
        this.isLoading$.next(false);
        this.toastService.error(err?.error?.message ?? 'Error al crear el deporte');
      },
    });
  }

  protected cancel(): void {
    this.dialogRef.close({ created: false });
  }
}
