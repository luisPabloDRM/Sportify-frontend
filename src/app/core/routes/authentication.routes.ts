import { Routes } from '@angular/router';
import { AuthenticationLogIn } from '../../modules/authentication/authentication-log-in/authentication-log-in';
import { AuthenticationRequestRecovery } from '../../modules/authentication/authentication-request-recovery/authentication-request-recovery';
import { AuthenticationRecoverPassword } from '../../modules/authentication/authentication-recover-password/authentication-recover-password';
import { AuthenticationRegister } from '../../modules/authentication/authentication-register/authentication-register';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'log-in',
  },
  {
    path: 'log-in',
    component: AuthenticationLogIn,
  },
  {
    path: 'register',
    component: AuthenticationRegister,
  },
  {
    path: 'request-recovery',
    component: AuthenticationRequestRecovery,
  },
  {
    path: 'recover-password',
    component: AuthenticationRecoverPassword,
  },
];
