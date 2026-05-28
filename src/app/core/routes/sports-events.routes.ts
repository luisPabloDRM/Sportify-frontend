import { Routes } from '@angular/router';
import { SportsEventsDashboard } from '../../modules/sports-events/components/sports-events-dashboard/sports-events-dashboard';
import { SportsEventsOverview } from '../../modules/sports-events/components/sports-events-overview/sports-events-overview';
import { SportsEventsCreate } from '../../modules/sports-events/components/sports-events-create/sports-events-create';
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
  {
    path: 'create/sport/:sportId',
    component: SportsEventsCreate,
  },
  {
    path: 'create',
    component: SportsEventsCreate,
  },
];
