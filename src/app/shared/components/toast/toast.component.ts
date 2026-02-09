import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ToastData } from './toast.models';
import { ToastIcon } from './toast.constants';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-toast',
  imports: [CommonModule, MaterialModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  protected readonly icon: string;
  protected readonly message: string;
  protected readonly type: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) protected readonly data: ToastData) {
    this.icon = ToastIcon[data.type];
    this.message = data.message;
    this.type = data.type.toLowerCase();
  }
}
