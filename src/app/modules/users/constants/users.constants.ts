import { ThemeColor } from "../../../shared/models/theme.models";
import { PaginationFilterType } from "../../../shared/utils/pagination/pagination.models";
import { UserFiltersDTO } from "../models/users.models";


export enum UserRole {
  Superadministrator = 'Superadministrador',
  Administrator = 'Administrador',
  User = 'Usuario',
}

export enum UserMethod {
  Invitation = 'INVITATION',
  Password = 'PASSWORD',
}

export const USER_DESCRIPTION_PER_METHOD: {
  [key in UserMethod]: string;
} = {
  [UserMethod.Invitation]: 'Quiero enviar al nuevo usuario un e-mail de invitación',
  [UserMethod.Password]: 'Quiero configurar su contraseña de acceso ahora mismo',
};

export const USER_ICON_PER_ROLE: { [key in UserRole]: string } = {
  [UserRole.Superadministrator]: 'manage_accounts',
  [UserRole.Administrator]: 'settings',
  [UserRole.User]: 'people',
};

export const USER_COLOR_PER_ROLE: { [key in UserRole]: ThemeColor } = {
  [UserRole.Superadministrator]: 'warn',
  [UserRole.Administrator]: 'primary',
  [UserRole.User]: 'accent',
};

export const USER_FILTER_TYPE_PER_KEY: {
  [key in keyof UserFiltersDTO]: PaginationFilterType;
} = {
  fullname: 'string',
  email: 'string',
  phone: 'string',
  roleIds: 'arrayNumber',
  isEnabled: 'boolean',
};

export type UserAction = 'DELETE' | 'TOGGLE';
