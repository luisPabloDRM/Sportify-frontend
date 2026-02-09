import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthUser } from "../services/auth-user/auth-user";
import { AuthenticationDomain } from "../../modules/authentication/services/authentication-domain";
import { ToastService } from "../../shared/components/toast/toast.service";
import { catchError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const authUserService = inject(AuthUser)
    const authenticationDomainService = inject(AuthenticationDomain)
    const toastService = inject(ToastService)
    const auth = authUserService.get();

    if(auth?.accessToken){
        const req = request.clone({setHeaders: {
            Authorization: auth.accessToken
        }})
        return next(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (AUTH_CODES.includes(error.error.code)) {
                    toastService.error('La sesión ha caducado. Inicia sesión de nuevo');
                    authenticationDomainService.logOut();
                }
                throw error;
            })
        );
    }
    return next(request)
};

const AUTH_CODES = [
  'AUTH_TOKEN_EXPIRED_ERROR',
  'AUTH_TOKEN_FORMAT_ERROR',
  'AUTH_TOKEN_REQUIRED_ERROR',
  'AUTH_USER_FORBIDDEN_ACCESS_ERROR',
  'AUTH_USER_IS_NOT_ACTIVE_ERROR',
  'REFRESH_TOKEN_NOT_RENEWABLE_ERROR',
  'REFRESH_TOKEN_EXPIRED_ERROR',
  'REFRESH_TOKEN_UNAVAILABLE_ERROR',
];