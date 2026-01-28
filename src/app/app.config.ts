import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './core/routes/app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MaterialModule } from './shared/material/material.module';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(MaterialModule),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay())
  ]
};
