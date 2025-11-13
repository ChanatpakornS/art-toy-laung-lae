# Project Code Conventions

This document outlines the coding conventions and best practices for the Art-Toy
Pre-Order System project. Adhering to these guidelines ensures code consistency,
readability, and maintainability.

## 1. Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN/UI](https://ui.shadcn.com/)
- **State Management**:
  - Server State: [@tanstack/react-query](https://tanstack.com/query/latest)
  - Form State: [@tanstack/react-form](https://tanstack.com/form/latest)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Linting & Formatting**: ESLint & Prettier

## 2. File and Folder Structure

The `src/` directory is organized as follows:

- `app/`: Contains all pages and API routes, following the Next.js App Router
  structure.
  - `(group)/`: Route groups for organization (e.g., `(admin)`).
  - `api/`: API route handlers.
  - `page.tsx`: The main component for a route segment.
  - `layout.tsx`: The layout component for a route segment.
- `components/`: Reusable React components.
  - `ui/`: Unstyled, reusable components from ShadCN/UI.
  - `theme/`: Components related to theme switching (dark/light mode).
  - Custom components are placed directly in `components/` or in subdirectories
    (e.g., `components/arttoy/`).
- `hooks/`: Custom React hooks (e.g., `use-mobile.ts`).
- `libs/`: Utility functions, API client setup, and external service
  integrations.
- `providers/`: React Context providers (e.g., `NextAuthProvider`).
- `styles/`: Global CSS files.
- `types/`: TypeScript type and interface definitions.
- `utils/`: General utility functions (e.g., date formatting).

## 3. Naming Conventions

- **Files**: Use **kebab-case** (e.g., `arttoy-card.tsx`, `api-client.ts`).
- **Components**: Use **PascalCase** (e.g., `ArtToyCard`, `Navbar`). Page
  components should be named `Page` (e.g.,
  `export default function ArtToysPage()`).
- **Variables & Functions**: Use **camelCase** (e.g., `const geistSans`,
  `function formatISOToShort()`).
- **Types & Interfaces**: Use **PascalCase** (e.g., `interface Arttoy`,
  `type NextAuthProviderProps`).

## 4. Component Design

- **Functional Components**: All components should be functional components.
- **Client Components**: Use the `'use client';` directive at the top of files
  for components that require interactivity, state, or browser-only APIs.
- **Composition**: Build complex components by composing smaller, single-purpose
  components.
- **Props**: All component props must be explicitly typed.

## 5. Styling

- **Tailwind CSS**: Use Tailwind CSS utility classes for all styling. Avoid
  writing custom CSS unless absolutely necessary.
- **`cn` Utility**: Use the `cn` function from `libs/utils.ts` to conditionally
  apply classes. This handles merging and conflicts gracefully.
- **CSS Variables**: Global theme and style variables are defined in
  `src/styles/globals.css`. Use these variables for consistent theming (e.g.,
  `bg-background`, `text-primary`).

## 6. State Management

- **Server State**: Use `@tanstack/react-query` for fetching, caching, and
  managing server state. Use the provided hooks `useApiQuery` and
  `useApiMutation` from `libs/api-client.ts`.
- **Form State**: Use `@tanstack/react-form` for managing form logic and
  validation. Define validation schemas using `zod`.
- **UI State**: Use React hooks (`useState`, `useContext`) for local and shared
  component state.

## 7. TypeScript

- **Strict Typing**: Write strongly-typed code. Avoid using `any` whenever
  possible.
- **Shared Types**: Define types shared across multiple files in the
  `src/types/` directory (e.g., `arttoy.types.ts`).
- **Props and Interfaces**: Define `Props` types for component props and
  `interface` for data structures.

## 8. Imports

- **Path Aliases**: Use path aliases (`@/`) for absolute imports from the `src`
  directory. This is configured in `tsconfig.json`.
- **Grouping**: Group imports in the following order:
  1. React imports (`react`, `next/*`)
  2. External library imports
  3. Internal module imports (`@/components`, `@/libs`, etc.)

**Example:**

```typescript
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { ThemeToggle } from '@/components/theme/theme-toggle';
```

## 9. Linting and Formatting

- **Prettier & ESLint**: The project is configured with Prettier for code
  formatting and ESLint for code analysis.
- **Commands**:
  - Run `pnpm format` to format all files.
  - Run `pnpm lint` to check for linting errors.
- **Pre-commit Hook**: A pre-commit hook is set up to automatically run linting
  and formatting before each commit to maintain code quality.
