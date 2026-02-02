import { DateTime } from 'luxon';
import { UserRole } from '../constants/users.constants';
import { RoleEntityPlainDTO } from '../../roles/models/roles.models';

export type UserEntityPlainDTO = {
  id: number;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  phone: string;
  roleId: number;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  role: RoleEntityPlainDTO;
  roleName: UserRole;
};

export type UserEntityParsedDTO = Omit<UserEntityPlainDTO, 'createdAt' | 'updatedAt'> & {
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type UserPaginatedPlainDTO = Pick<
  UserEntityPlainDTO,
  'id' | 'fullname' | 'email' | 'phone' | 'roleId' | 'roleName' | 'isEnabled'
>;

export type UserPaginatedParsedDTO = UserPaginatedPlainDTO;

export type UserCreateDTO = Pick<
  UserEntityParsedDTO,
  'firstname' | 'lastname' | 'email' | 'phone' | 'roleId' | 'isEnabled'
>;

export type UserUpdateDTO = Pick<
  UserEntityParsedDTO,
  'firstname' | 'lastname' | 'email' | 'phone' | 'roleId' | 'isEnabled'
>;

export type UserPasswordUpdateDTO = {
  current: string;
  password: string;
  confirmation: string;
};

export type UserFiltersDTO = Partial<{
  fullname: string | null;
  email: string | null;
  phone: string | null;
  roleIds: number[] | null;
  isEnabled: boolean | null;
}>;
