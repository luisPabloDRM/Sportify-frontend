import { DateTime } from 'luxon';
import { UserEntityParsedDTO } from '../../users/models/users.models';
import { SportEntityParsedDTO } from '../../sports/models/sports.models';

export type SportEventEntityPlainDTO = {
  id: number;
  name: string;
  location: string;
  eventDate: DateTime;
  maxPlayers: number;
  minPlayers: number;
  isUserCreator: boolean;
  sportId: number;
  sport: SportEntityParsedDTO;
  confirmed: boolean;
  users: Array<Pick<UserEntityParsedDTO, 'id' | 'fullname'>>;
  createdAt: string;
  updatedAt: string;
};
export type SportEventEntityParsedDTO = Omit<
  SportEventEntityPlainDTO,
  'createdAt' | 'updatedAt'
> & {
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type SportEventCreateRawDTO = Pick<
  SportEventEntityPlainDTO,
  'location' | 'isUserCreator' | 'eventDate' | 'name' | 'sportId' | 'minPlayers' | 'maxPlayers'
>;
export type SportEventCreateProcessedDTO = Pick<
  SportEventEntityPlainDTO,
  'location' | 'eventDate' | 'name' | 'sportId' | 'minPlayers' | 'maxPlayers'
> & {
  users: Array<Pick<UserEntityParsedDTO, 'id'>>;
};

export type SportEventUpdateRawDTO = Pick<
  SportEventEntityPlainDTO,
  'location' | 'eventDate' | 'name' | 'sportId' | 'minPlayers' | 'maxPlayers'
>;

export type SportEventUpdateProcessedDTO = Pick<
  SportEventEntityPlainDTO,
  'location' | 'eventDate' | 'name' | 'sportId' | 'minPlayers' | 'maxPlayers'
> & {
  users: Array<number>;
};

export type SportEventPaginatedPlainDTO = Pick<
  SportEventEntityPlainDTO,
  'id' | 'location' | 'name' | 'eventDate' | 'sportId' | 'minPlayers' | 'maxPlayers' | 'createdAt'
> & {
  sportName: string;
  users: Array<Pick<UserEntityParsedDTO, 'id' | 'fullname'> & { isUserCreator?: boolean }>;
};

export type SportEventPaginatedParsedDTO = SportEventPaginatedPlainDTO;

export type SportEventFilterDTO = Partial<{
  id: number;
  location: string;
  eventDate: DateTime;
  name: string;
  nameExact: string;
  sportId: number;
  sportName: string;
  confirmed: boolean;
  usersIds: number[];
}>;
