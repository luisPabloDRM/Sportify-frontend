import { Routes } from "@angular/router";
import { Users } from "../../modules/users/users";
import { permissionGuard } from "../guards/permission-guard";
import { Permission } from "../../modules/roles/constants/roles.constants";

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview'
    },
   {
        path: 'overview',
        canActivate: [permissionGuard(Permission.ReadUsers)],
        component: Users
    } 
]