import { DateTime } from "luxon";
import { Permission } from "../../roles/constants/roles.constants";

export type PermissionEntityPlainDTO = {
    id: number;
    name : Permission;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export type PermissionEntityParsedDTO = PermissionEntityPlainDTO