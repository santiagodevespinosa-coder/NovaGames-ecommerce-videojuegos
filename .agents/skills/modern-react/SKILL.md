---
name: react-current
description: Modern React 19 practices for 2026 — Server Components, useActionState, useOptimistic, use(), TypeScript, performance, and clean component architecture. Use when writing, reviewing, or refactoring React (or Next.js App Router) code.
---

# React Current Practices (2026)

You are an expert React 19 engineer. Prefer the modern patterns below. Inspect the project (package.json, existing components, routing) before writing code and match its stack.

## Core Principles

1. **Server-first by default**  
   Prefer Server Components. Only add `"use client"` when the component needs interactivity, browser APIs, or client-only hooks.

2. **Smallest correct change**  
   Don’t refactor unrelated code. Don’t add new libraries unless required and already in the project (or clearly justified).

3. **TypeScript**  
   Use TypeScript for new code. Prefer interfaces/types for props, explicit return types where helpful, and proper event/ref typing. Avoid `any`.

4. **Immutability**  
   Never mutate props or state. Prefer `.toSorted()`, `.toReversed()`, spread, and functional updates.

## Component Architecture

| Type              | When to use                          | Notes                                      |
|-------------------|--------------------------------------|--------------------------------------------|
| Server Component  | Data fetching, layout, static UI     | Default. Can `await`, access DB/secrets    |
| Client Component  | Event, local state, effects         | Mark with `"use client"` at top            |
| Presentational    | Pure UI                              | Props in, UI out                           |

- Keep components focused (single responsibility).
- Prefer composition over prop drilling.
- Colocate related files when the project already does so.
- Extract custom hooks for reusable stateful logic (name them `useXxx`).

## Data Fetching & Mutations (React 19)

### Reading data
- **Server Components**: `await` fetches / DB calls directly. Parallelize independent work with `Promise.all`.
- **Client Components**: Pass a promise from a Server Component and read it with `use(promise)` + Suspense. Avoid `useEffect` + `useState` for initial data when possible.
- For client caching, polling, infinite lists, offline → use the project’s existing solution (TanStack Query / SWR) if present.

### Mutations
- Use:
  - `useActionState` for form state + pending + result
  - `useFormStatus` (in a child) for submit-button pending state
  - `useOptimistic` for instant UI feedback that auto-reverts on failure
  - `useTransition` when you own the `setState` and want non-blocking updates

## Hooks Best Practices

- Call hooks only at the top level.
- Prefer derived state over extra `useState` + `useEffect` sync.
- Use `useEffect` only for true side effects (subscriptions, DOM, non-React systems). Clean up.
- Prefer `useEffectEvent` (React 19.2+) for non-reactive logic inside effects.
- Memoize only when measured or clearly needed (`useMemo` / `useCallback` / `React.memo`). Don’t sprinkle them everywhere.
- For expensive lists: virtualize; for typing/filter UIs: `useDeferredValue` or `useTransition`.

## Forms (preferred pattern)

```tsx
// Prefer this shape over manual useState + onSubmit + loading flags
const [state, formAction, isPending] = useActionState(submitAction, initialState);

<form action={formAction}>
  {/* fields */}
  <SubmitButton /> {/* uses useFormStatus internally */}
</form>