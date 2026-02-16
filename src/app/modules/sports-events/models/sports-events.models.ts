import { DateTime } from 'luxon'
import { SportEntityDTO } from '../sports/sports_interfaces.js'
import { Nullish } from '#types/global'
import { UserEntityDTO } from '#users/users_interfaces'

export type SportEventEntityDTO = {
  id: number
  name: string
  location: string
  eventDate: DateTime
  maxPlayers: number
  minPlayers: number
  isUserCreator: boolean
  sportId: number
  sport: SportEntityDTO
  confirmed: boolean
  users: Array<Pick<UserEntityDTO, 'id' | 'isUserCreator' | 'fullname'>>
  createdAt: DateTime
  updatedAt: DateTime
}

export type SportEventCreateRawDTO = Pick<
  SportEventEntityDTO,
  'location' | 'isUserCreator' | 'eventDate' | 'name' | 'sportId' | 'minPlayers' | 'maxPlayers'
>
export type SportEventCreateProcessedDTO = Pick<
  SportEventEntityDTO,
  'location' | 'eventDate' | 'name' | 'sportId' | 'minPlayers' | 'maxPlayers'
> & {
  users: Array<Pick<UserEntityDTO, 'id' | 'isUserCreator'>>
}

export type SportEventUpdateRawDTO = Pick<
  SportEventEntityDTO,
  'location' | 'eventDate' | 'name' | 'sportId' | 'minPlayers' | 'maxPlayers'
>

export type SportEventUpdateProcessedDTO = Pick<
  SportEventEntityDTO,
  'location' | 'eventDate' | 'name' | 'sportId' | 'minPlayers' | 'maxPlayers'
> & {
  users: Array<number>
}

export type SportEventPaginatedDTO = Pick<
  SportEventEntityDTO,
  'id' | 'location' | 'name' | 'eventDate' | 'sportId' | 'minPlayers' | 'maxPlayers'
> & { sportName: string }

export type SportEventFilterDTO = Nullish<{
  id: number
  location: string
  eventDate: DateTime
  name: string
  nameExact: string
  sportId: number
  sportName: string
  confirmed: boolean
  usersIds: number[]
}>
