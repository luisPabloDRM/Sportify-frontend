import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview'
    },
   /*  {
        path: 'overview',
        canActivate: [permissionGuard(Permission.ReadUsers)],
        component: User
    } */
]