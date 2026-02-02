import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { AuthUser } from '../../../core/services/auth-user/auth-user';

export const usersUpdateGuard: CanActivateFn = (route, state) => {
  const authUserService = inject(AuthUser);
  const toastService = inject(ToastService);
  const id = Number.parseInt(route.params['userId']);

  if (id === authUserService.get()?.user.id) {
    toastService.error(`No puedes editar tu propio usuario`);
    return false;
  }
  return true;
};
