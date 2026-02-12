import { Routes } from "@angular/router";
import { permission } from "process";
import { permissionGuard } from "../guards/permission-guard";
import { Permission } from "../../modules/roles/constants/roles.constants";
import { SportsEventsDashboard } from "../../modules/sports-events/components/sports-events-dashboard/sports-events-dashboard";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    //TODO: update permissions const
    canActivate: [permissionGuard(Permission.ReadUsers)],
    component:SportsEventsDashboard
  },
];