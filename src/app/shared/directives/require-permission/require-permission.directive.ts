
import { Directive, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, tap } from 'rxjs';
import { Permission } from '../../../modules/roles/constants/roles.constants';
import { AuthUser } from '../../../core/services/auth-user/auth-user';

@Directive({
  selector: '[appRequirePermission]',
})
export class RequirePermissionDirective {
  protected authUserService = inject(AuthUser);
  readonly permission = input.required<Permission>({ alias: 'appRequirePermission' });
  protected readonly render$ = toObservable(this.permission).pipe(
    tap((permission) =>
      this.authUserService.hasPermission(permission)
        ? this.viewContainerRef.createEmbeddedView(this.templateRef)
        : this.viewContainerRef.clear()
    ),
    takeUntilDestroyed()
  );
  protected readonly autosuscribe = combineLatest([this.render$])
    .pipe(takeUntilDestroyed())
    .subscribe();

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef
  ) {}
}
