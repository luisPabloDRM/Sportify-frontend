import { DateTime } from 'luxon'

export type SportEntityPlainDTO = {
  id: number
  name: string
  icon: string
  createdAt: string
  updatedAt: string
}

export type SportEntityParsedDTO = Omit<SportEntityPlainDTO, 'createdAt' | 'updatedAt'> & {
    createdAt: DateTime;
    updatedAt: DateTime;
}

export type SportCreateRawDTO = {
  name: string;
}

export type SportFiltersDTO = Partial<{
  id: number
  name: string
}>
