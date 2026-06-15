import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize, first } from 'rxjs';
import { MaterialModule } from '../../../shared/material/material.module';
import { UsersDomain } from '../../users/services/users-domain';
import { ToastService } from '../../../shared/components/toast/toast.service';

const passwordMatchValidator = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirmation = group.get('confirmation')?.value;
  return password && confirmation && password !== confirmation
    ? { passwordMismatch: true }
    : null;
};

@Component({
  selector: 'app-authentication-register',
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterLink],
  templateUrl: './authentication-register.html',
  styleUrl: './authentication-register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationRegister implements OnDestroy {
  private readonly usersDomain = inject(UsersDomain);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  protected readonly loading = signal(false);
  protected showPassword = false;
  protected showConfirmation = false;

  protected readonly form = new FormGroup(
    {
      firstname: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      lastname:  new FormControl('', [Validators.required, Validators.maxLength(256)]),
      email:     new FormControl('', [Validators.required, Validators.email]),
      phone:     new FormControl('', [Validators.required, Validators.maxLength(64)]),
      password:  new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmation: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator },
  );

  ngOnDestroy(): void {
    this.form.reset();
  }

  protected submit(): void {
    if (this.form.invalid || this.loading()) return;

    const { firstname, lastname, email, phone, password } = this.form.getRawValue();
    this.loading.set(true);

    this.usersDomain
      .register({ firstname: firstname!, lastname: lastname!, email: email!, phone: phone!, password: password! })
      .pipe(first(), finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.toastService.success('Cuenta creada. Ya puedes iniciar sesión');
          this.router.navigate(['/authentication/log-in']);
        },
        error: (err) => {
          this.toastService.error(err?.error?.message ?? 'Error al crear la cuenta');
        },
      });
  }
}
