# Backend Integration Plan (`API_videojurgos` → `NovaGames`)

Plan to connect the React frontend (`NovaGames-ecommerce-videojuegos`) with the ASP.NET Core + MySQL backend (`API_videojurgos` running via XAMPP + `dotnet`).

## Progress

- [x] **Phase 1: Align Vite Proxy & API Client**
  - [x] Update `vite.config.ts` `/api` proxy target to `http://localhost:5292`.
  - [x] Create `src/services/apiClient.ts` with `apiFetch` helper (JWT Bearer token header + error handling).

- [x] **Phase 2: Align TypeScript Types & Image Mapping**
  - [x] Add backend-aligned DTO interfaces in `src/types/index.ts` (`Usuario`, `LoginRequest`, `RegisterRequest`, `AuthDatos`, `JuegoApi`, `CreateJuegoApiDto`, `BibliotecaItem`, `CreateOrdenDto`, `OrdenResponse`, `Genero`, `Empresa`, `Resena`).
  - [x] Create `src/utils/gameImages.ts` with `getGameImageUrl` (local cover fallback by slug/title) and `calcularPrecioFinal`.
  - [x] *(Backend)* Add `imagen_url VARCHAR(500) NULL` to `juegos` (migration `AddImagenUrlToJuegosTable`, entity, DTOs, repository, service, `DATABASE.sql`).

- [x] **Phase 3: Services Layer & Minimal Backend Fix**
  - [x] Update `src/services/juegosService.ts` (`obtenerJuegos`, `obtenerJuegoPorId`, `crearJuego`).
  - [x] Create `src/services/authService.ts` (`login`, `signup`, `getMe`, `logout`).
  - [x] Create `src/services/bibliotecaService.ts` & `src/services/ordenesService.ts`.
  - [x] *(Backend)* Update `OrdenService.CreateAsync` in `API_videojurgos` so purchasing a game also inserts it into `biblioteca`.

- [x] **Phase 4: Connect Components to Real Data**
  - [x] `src/App.tsx`: Fetch catalog from `juegosService` on mount.
  - [x] `src/App.tsx`: Persist `Usuario` + JWT and show Admin panel only for `Admin` / `Desarrollador`.
  - [x] `src/App.tsx`: Load user library on login & revalidate session via `/api/auth/me`.
  - [x] `src/components/auth/PanelLogin.tsx`: Real login (`email` + `password`) and signup (`nombreUsuario` + `email` + `password`) with inline error messages.
  - [x] `src/components/admin/PanelAdmin.tsx`: Create games using `CreateJuegoApiDto` (`precioBase`, `descuentoPorcentaje`, auto-generated `slug`).
  - [x] `src/components/juegos/VistaDetalleJuego.tsx` & `BibliotecaJuegos.tsx`: Real purchase flow via `ordenesService` and library display enriched with game titles.
