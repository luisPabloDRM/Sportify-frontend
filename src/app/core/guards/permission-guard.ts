import { CanActivateFn } from '@angular/router';
import { Permission } from '../../modules/roles/constants/roles.constants';
import { inject } from '@angular/core';
import { AuthUser } from '../services/auth-user/auth-user';
import { ToastService } from '../../shared/components/toast/toast.service';

export const permissionGuard = (permission : Permission):  CanActivateFn => () => {
  const authUserService = inject(AuthUser);
  const toastService  = inject(ToastService);
  
  if(!authUserService.get()){
    toastService.error('Es necesario iniciar sesión');
    return false;
  }
  if(!authUserService.hasPermission(permission)) {
    toastService.error('No dispones de suficientes permisos');
    return false
  }
  return true

};
