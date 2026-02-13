import { Routes } from '@angular/router';
import { permission } from 'process';
import { permissionGuard } from '../guards/permission-guard';
import { Permission } from '../../modules/roles/constants/roles.constants';
import { SportsEventsDashboard } from '../../modules/sports-events/components/sports-events-dashboard/sports-events-dashboard';
import { SportsEventsOverview } from '../../modules/sports-events/components/sports-events-overview/sports-events-overview';
import { sportGetOneResolver } from '../../modules/sports/resolvers/sport_get_one.resolver';

export const routes: Routes = [
  {
    path: '',
    component: SportsEventsDashboard,
  },
  {
    path: 'overview/sport/:sportId',
    resolve: { sport: sportGetOneResolver },
    component: SportsEventsOverview,
  },
];