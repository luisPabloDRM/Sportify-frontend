import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Permission } from '../../modules/roles/constants/roles.constants';
import { permissionGuard } from '../guards/permission-guard';
import { AuthUser } from '../services/auth-user/auth-user';
import { UsersOverview } from '../../modules/users/components/users-overview/users-overview';
import { UsersProfile } from '../../modules/users/components/users-profile/users-profile';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => {
      const authUser = inject(AuthUser);
      const router = inject(Router);
      return authUser.hasPermission(Permission.ReadUsers)
        ? router.parseUrl('/dashboard/users/list')
        : router.parseUrl('/dashboard/users/profile');
    },
  },
  {
    path: 'list',
    component: UsersOverview,
    canActivate: [permissionGuard(Permission.ReadUsers)],
  },
  {
    path: 'profile',
    component: UsersProfile,
  },
];
