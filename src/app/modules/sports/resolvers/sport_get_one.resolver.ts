import { ResolveFn } from "@angular/router";
import { SportEntityParsedDTO } from "../models/sports.models";
import { inject } from "@angular/core";
import { SportsDomainService } from "../services/sports-domain.service";

export const sportGetOneResolver: ResolveFn<SportEntityParsedDTO> = (route) => {
    const sportDomainService = inject(SportsDomainService);
    return sportDomainService.getOne(route.params['sportId']);
}