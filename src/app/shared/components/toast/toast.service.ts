import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from './toast.component';
import { ToastType } from './toast.constants';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly snackbar: MatSnackBar) {}

  private open = (message: string, type: ToastType, duration = 2000) => {
    this.snackbar.openFromComponent(ToastComponent, {
      data: {
        message,
        type,
      },
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  };

  success = (message: string, duration?: number) => {
    this.open(message, ToastType.Success, duration);
  };

  error = (message: string, duration?: number) => {
    this.open(message, ToastType.Error, duration);
  };

  warning = (message: string, duration?: number) => {
    this.open(message, ToastType.Warning, duration);
  };

  info = (message: string, duration?: number) => {
    this.open(message, ToastType.Info, duration);
  };
}
