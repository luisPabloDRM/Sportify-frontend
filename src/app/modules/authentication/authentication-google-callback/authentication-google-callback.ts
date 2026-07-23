import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationDomain } from '../services/authentication-domain';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { MaterialModule } from '../../../shared/material/material.module';

@Component({
  selector: 'app-authentication-google-callback',
  imports: [MaterialModule],
  templateUrl: './authentication-google-callback.html',
  styleUrl: './authentication-google-callback.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationGoogleCallback implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authenticationDomain: AuthenticationDomain,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;
    const code = params.get('code');

    if (!code) {
      this.toastService.error('No se ha podido iniciar sesión con Google. Inténtalo de nuevo.');
      this.router.navigate(['/authentication', 'log-in']);
      return;
    }

    this.authenticationDomain
      .googleExchange(code)
      .pipe(first())
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: () => this.router.navigate(['/authentication', 'log-in']),
      });
  }
}
