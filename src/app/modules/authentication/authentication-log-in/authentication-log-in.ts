import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { AuthenticationDomain } from '../services/authentication-domain';
import { Router, RouterLink } from '@angular/router';
import { LOG_IN_FORM } from '../constants/authentication.constants';
import { first } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-authentication-log-in',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './authentication-log-in.html',
  styleUrl: './authentication-log-in.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationLogIn implements OnDestroy {
  protected readonly form = LOG_IN_FORM;
  protected readonly loading = signal(false);

  constructor(
    private readonly authenticationDomain: AuthenticationDomain,
    private readonly router: Router,
  ) {}

  ngOnDestroy(): void {
    this.form.reset();
  }



  protected submit = () => {
    if (this.form.invalid || this.loading()) {
      return;
    }
    const data = this.form.getRawValue();
    this.loading.set(true);

    this.authenticationDomain
      .logIn(data)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
  };
}
