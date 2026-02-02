import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthUser } from '../services/auth-user/auth-user';
import { AuthenticationDomain } from '../../modules/authentication/services/authentication-domain';
import { ToastService } from '../../shared/components/toast/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authUserService = inject(AuthUser);
  const authenticationDomainService = inject(AuthenticationDomain);
  const refreshIsExpired = authenticationDomainService.verifyRefreshIsExpired();
  const tokenIsExpired = authenticationDomainService.verifyTokenIsExpired();
  const toastService = inject(ToastService);

  const auth = authUserService.get();

  if(!auth || ! auth.accessToken){
    toastService.error('Debes iniciar sesión para acceder a este contenido');
    authenticationDomainService.logOut();
    return false
  }

  if(tokenIsExpired && refreshIsExpired){
    toastService.error('La sesión ha caducado . Inicia sesión de nuevo');
    authenticationDomainService.logOut();
    return false
  }
  return true;
};
