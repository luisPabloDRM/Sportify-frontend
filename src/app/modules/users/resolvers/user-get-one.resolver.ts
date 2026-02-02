import { ResolveFn } from "@angular/router";
import { UserEntityParsedDTO } from "../models/users.models";
import { inject } from "@angular/core";
import { UsersDomain } from "../services/users-domain";

export const userGetOneResolver: ResolveFn<UserEntityParsedDTO> = (route) => {
    const userDomain = inject(UsersDomain);
    return userDomain.getOne(route.params['userID¡d']);
}