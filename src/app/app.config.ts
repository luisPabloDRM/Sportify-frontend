import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './core/routes/app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MaterialModule } from './shared/material/material.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(MaterialModule),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes, withRouterConfig({ paramsInheritanceStrategy: 'always' })),
    provideClientHydration(withEventReplay()),
  ],
};
