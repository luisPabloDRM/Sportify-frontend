import { Router, Routes } from '@angular/router';
import { Layout } from '../layout/layout';
import { AuthUser } from '../services/auth-user/auth-user';
import { inject } from '@angular/core';
import { Authentication } from '../../modules/authentication/authentication';
import { authGuard } from '../guards/auth-guard';
import { Permission } from '../../modules/roles/constants/roles.constants';
import { Users } from '../../modules/users/users';
import { permissionGuard } from '../guards/permission-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => {
      const authUserService = inject(AuthUser);
      const router = inject(Router);
      const user = authUserService.get()?.user;
      console.log("user", user)

      const url = user ? '/dashboard' : 'authentication';
      return router.parseUrl(url);
    },
  },
  {
    path: 'authentication',
    component: Authentication,
    loadChildren: () => import('./authentication.routes').then((m) => m.routes),
  },
  {
    path: 'dashboard',
    component: Layout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: () => {
          const authUserService = inject(AuthUser);
          const router = inject(Router);

          switch (true) {
            case authUserService.hasPermission(Permission.ReadUsers):
              return router.parseUrl('/dashboard/users');
            default:
              return router.parseUrl('/dashboard/profile');
          }
        },
      },
      /* {
            path: 'profile',
            component: Profile,
            loadChildren: () => import('./profile.routes').then((m) => m.routes)
        }, */
      {
        path: 'users',
        component: Users,
        canActivate: [permissionGuard(Permission.ReadUsers)],
        loadChildren: () => import('./users.routes').then((m) => m.routes),
      },
      /* 
      {
        path: 'log-ins',
        component: LogIns,
        canActivate: [permissionGuard(Permission.ReadLogIns)],
        loadChildren: () => import('./log-ins.routes').then((m) => m.routes),
      }, */
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('../../shared/components/page-not-found/page-not-found.component').then(
        (c) => c.PageNotFoundComponent,
      ),
  },
];
