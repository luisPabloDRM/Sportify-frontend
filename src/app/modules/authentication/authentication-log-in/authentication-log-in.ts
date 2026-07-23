import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { AuthenticationDomain } from '../services/authentication-domain';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LOG_IN_FORM } from '../constants/authentication.constants';
import { first, finalize } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { Api } from '../../../core/services/api/api';
import { ToastService } from '../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-authentication-log-in',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './authentication-log-in.html',
  styleUrl: './authentication-log-in.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationLogIn implements OnInit, OnDestroy {
  protected readonly form = LOG_IN_FORM;
  protected readonly loading = signal(false);
  protected showPassword = false;
  protected readonly googleRedirectUrl: string;

  constructor(
    private readonly authenticationDomain: AuthenticationDomain,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly apiService: Api,
    private readonly toastService: ToastService,
  ) {
    // Se fuerza el mismo host que sirve la SPA (en vez del host fijo de environment.local)
    // porque la cookie de estado OAuth de Ally solo viaja si /redirect y /callback comparten host.
    const googleRedirectUrl = new URL(`${this.apiService.getRoot()}/auth/google/redirect`);
    googleRedirectUrl.hostname = window.location.hostname;
    this.googleRedirectUrl = googleRedirectUrl.toString();
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('error') === 'google') {
      this.toastService.error('No se ha podido iniciar sesión con Google. Inténtalo de nuevo.');
    }
  }

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
      .pipe(
        first(),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          // El error ya se gestiona en AuthenticationDomain (toast)
        },
      });
  };
}
