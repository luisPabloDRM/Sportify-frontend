import { PaginationFilterType } from '../../../shared/utils/pagination/pagination.models';
import { SportEventFilterDTO } from '../models/sports-events.models';

export const SPORT_EVENT_FILTER_TYPES: {
  [key in keyof SportEventFilterDTO]: PaginationFilterType;
} = {
  location: 'string',
  eventDate: 'date',
  name: 'string',
  nameExact: 'string',
  sportId: 'number',
  sportName: 'string',
  confirmed: 'boolean',
};
