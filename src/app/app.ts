import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { catchError, map, of, shareReplay, startWith, switchMap } from 'rxjs';
import { AuthenticationDomain } from './modules/authentication/services/authentication-domain';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly authenticationDomainService = inject(AuthenticationDomain);
  protected readonly title = signal('frontend');

  protected readonly authIsVerified$ = of(
    this.authenticationDomainService.verifyRefreshIsAvailable(),
  ).pipe(
    switchMap((required) => (required ? this.authenticationDomainService.refresh() : of(true))),
    map(() => true),
    catchError(() => of(true)),
    startWith(false),
    shareReplay(1),
    takeUntilDestroyed(),
  );

  protected readonly vm = Object.freeze({
    authIsVerified: toSignal(this.authIsVerified$, { requireSync: true }),
  });
}
