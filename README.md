# Jugatta — Frontend

SPA en Angular que consume la API de [Sportify-backend](../Sportify-backend/readme.md). Ver también el [README general del proyecto](../README.md).

## Stack

- Angular 20 — standalone components, Signals, `provideZonelessChangeDetection`, `ChangeDetectionStrategy.OnPush`
- Angular Material (tema M3 vía `mat.theme()`)
- RxJS
- Luxon (fechas)
- Remeda (utilidades funcionales)

## Puesta en marcha

```bash
npm install
ng serve
```

Abre `http://localhost:4200/`. La app recarga automáticamente al modificar el código fuente.

### Configuración de entorno

`src/environments/environment.ts` define la URL del backend (usado por `ng serve` y por defecto en dev):

```ts
export const environment = {
  api: { url: 'http://<IP-LAN>:3333/api' },
  ...
};
```

Si el backend corre en otra máquina de la red local (o la IP ha cambiado por DHCP), actualiza `IP-LAN` con la IP actual de esa máquina.

## Arquitectura

Cada módulo de negocio (`src/app/modules/*`) sigue el mismo patrón de capas:

```
Component → DomainService → ApiService → HttpClient
```

- **`*-api.service.ts`**: únicamente llamadas HTTP, sin lógica de negocio.
- **`*-domain.service.ts`**: transforma DTOs (fechas ISO ↔ Luxon `DateTime`), centraliza el manejo de errores con toasts.
- **Componentes**: usan `signal`/`computed`/`toSignal`, inyección con `inject()`, sintaxis de control de flujo `@if`/`@for`, y `ChangeDetectionStrategy.OnPush` en todos los casos.

Los imports de Angular Material se hacen a través del módulo compartido `src/app/shared/material/material.module.ts`, que re-exporta todos los módulos de Material usados en la app.

### Estructura de módulos

```
src/app/
├── core/                    Layout (header/footer), rutas, guards, servicios transversales (auth, api)
├── shared/                  Componentes, directivas y utilidades reutilizables (toasts, paginación...)
└── modules/
    ├── authentication/      Login, registro, recuperación de contraseña
    ├── sports/              Catálogo de deportes
    ├── sports-events/       Eventos deportivos: listado, creación, edición, inscripción, asistencia
    ├── users/                Perfil de usuario y gestión de usuarios (admin)
    ├── roles/               Constantes de roles y permisos
    └── password-recoveries/ Modelos del flujo de recuperación de contraseña
```

## Funcionalidades principales

- Login/logout con JWT y refresco automático de sesión.
- Catálogo de deportes → listado de eventos por deporte.
- Eventos separados en pestañas de **próximos** y **pasados** (las pestañas solo se muestran si hay eventos de ambos tipos).
- Crear, editar, apuntarse y desapuntarse de un evento.
- Diálogo de detalle de evento con la lista de participantes; el creador puede marcar la asistencia de cada uno, lo que suma puntos a su perfil.
- Perfil de usuario con datos personales y puntos acumulados.
- Listado paginado de usuarios con filtros (solo administradores).

## Scripts disponibles

```bash
ng serve          # servidor de desarrollo
ng build          # build de producción en dist/
ng test           # tests unitarios (Karma)
```

## Despliegue en Railway

Es un SPA puramente estático: no hay servidor Node en runtime, todo se sirve como archivos ya compilados (el paquete `serve` dentro del contenedor solo reparte esos estáticos y hace el fallback de rutas a `index.html` que necesita el router de Angular).

1. `ng build` usa la configuración `production` por defecto, que aplica `fileReplacements` para sustituir `src/environments/environment.ts` por `src/environments/environment.prod.ts` — **antes del primer build de producción, edita `environment.prod.ts` con la URL pública real del backend** (`api.url`). Como el valor se hornea en build time, cualquier cambio posterior de esa URL requiere volver a construir y desplegar.
2. **Crear el servicio en Railway** apuntando a este repo de GitHub — detecta el `Dockerfile` de la raíz automáticamente, no hace falta configurar build command ni variables de entorno en runtime.
3. Una vez desplegado, copiar la URL pública que asigna Railway y usarla para actualizar `FRONTEND_URL` y `GOOGLE_CALLBACK_URL` en el servicio del backend (ver [readme del backend](../Sportify-backend/readme.md#despliegue-en-railway)).
