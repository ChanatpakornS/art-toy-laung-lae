# Art Toy Pre-Order System - Project Context

## Project Overview

**Art Toy Laung Lae** is a Next.js-based web application for managing art toy
pre-orders. The system supports two user roles (admin and member) with
authentication and role-based authorization. Users can browse, view, and
pre-order limited-edition art toys with quota management.

### Key Objectives

- Streamline art toy pre-order process
- Provide secure user authentication and authorization
- Enable role-based access control (admin/member)
- Manage art toy inventory and availability quotas
- Track and manage pre-order requests

---

## Tech Stack

### Frontend Framework

- **Next.js 15.5.3** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety

### Authentication

- **NextAuth.js 4.24.11** - Authentication solution with JWT strategy
- **Credentials Provider** - Email/password authentication

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Headless UI component library
- **Shadcn/ui** - Pre-built accessible components
- **Lucide React** - Icon library
- **next-themes** - Dark/light mode support

### State Management & Data Fetching

- **TanStack React Query (v5.87.4)** - Server state management
- **TanStack React Form (v1.23.7)** - Form state management
- **React Hook Form (v7.65.0)** - Form validation

### Validation & Utilities

- **Zod (v4.1.8)** - Schema validation
- **date-fns (v4.1.0)** & **dayjs (v1.11.18)** - Date manipulation
- **clsx & tailwind-merge** - Conditional styling
- **class-variance-authority** - Component variant management

### Development Tools

- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting
- **Turbopack** - Next.js bundler (dev mode)

---

## Project Structure

```
art-toy-laung-lae/
├── public/
│   └── images/           # Static images and assets
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (admin)/      # Admin-only routes
│   │   │   └── arttoy-management/
│   │   ├── api/          # API routes
│   │   │   ├── auth/     # NextAuth configuration
│   │   │   └── register/ # Registration endpoint
│   │   ├── arttoys/      # Art toys browsing page
│   │   ├── login/        # Login page
│   │   ├── register/     # Registration page
│   │   ├── about/        # About page
│   │   ├── contact/      # Contact page
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Homepage
│   ├── components/
│   │   ├── arttoy/       # Art toy specific components
│   │   ├── theme/        # Theme provider & toggle
│   │   ├── ui/           # Shadcn/ui components
│   │   ├── navbar.tsx    # Navigation component
│   │   ├── footer.tsx    # Footer component
│   │   └── container.tsx # Layout container
│   ├── hooks/            # Custom React hooks
│   ├── libs/             # Library utilities
│   │   ├── api-client.ts # API client with React Query
│   │   ├── login.ts      # Login API handler
│   │   ├── register.ts   # Registration API handler
│   │   └── utils.ts      # General utilities
│   ├── providers/        # React context providers
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript type definitions
│   │   └── arttoy.types.ts
│   ├── utils/            # Utility functions
│   └── middleware.ts     # Next.js middleware (currently disabled)
├── components.json       # Shadcn/ui configuration
├── CONTEXT.md           # This file
├── CONVENTION.md        # Coding conventions
├── README.md            # Project documentation
├── SWAGGER.md           # API documentation
└── Configuration files  # next.config, tsconfig, eslint, etc.
```

---

## Architecture & Design Patterns

### App Router Structure

- **Route Groups**: `(admin)` for role-specific routes
- **API Routes**: RESTful endpoints in `app/api/`
- **Server Components**: Default for better performance
- **Client Components**: Interactive UI with `'use client'` directive

### Authentication Flow

1. User submits credentials via `/login` page
2. NextAuth Credentials Provider validates via backend API
3. JWT token stored in session
4. Session available via `useSession()` hook
5. Middleware can protect routes (currently disabled)

### Data Flow

1. **API Client** (`libs/api-client.ts`) wraps fetch with TanStack Query
2. **Generic Hooks**: `useApiQuery`, `useApiMutation` for CRUD operations
3. **Type Safety**: TypeScript interfaces define data structures
4. **Server-side validation**: Zod schemas validate forms

### Component Architecture

- **Atomic Design**: UI components in `components/ui/`
- **Feature Components**: Domain-specific in `components/arttoy/`
- **Composition**: Compound components (Dialog, Card, etc.)
- **Accessibility**: ARIA-compliant Radix UI primitives

---

## Key Features & Implementation Status

### User Management ✅

- [x] User registration with name, email, tel, role, password
- [x] Login with email/password (JWT-based)
- [x] Logout functionality
- [x] Session management with NextAuth
- [ ] **Middleware protected routes** (TODO: Currently disabled in
      `middleware.ts`)

### Art Toy Management 🚧

- [x] View art toys (all users)
- [x] Art toy card component with dialog details
- [ ] Admin CRUD operations (add/update/delete)
- [ ] Arrival date validation (must be >= current date)
- [ ] Auto-generated ID for new art toys

### Pre-Order Management 📋 (Planned)

- [ ] Member can create pre-order (max 5 items per order)
- [ ] Shopping cart/state management (Context/Redux)
- [ ] One order per art toy per member
- [ ] Member view/edit/delete own orders
- [ ] Admin view/edit/delete any order
- [ ] Order page at `/myorder`

---

## Data Models

### User

```typescript
interface User {
  _id: string;
  name: string;
  email: string;
  tel?: string;
  role: 'admin' | 'member';
  password: string; // hashed
  createdAt: string;
}
```

### Art Toy

```typescript
interface Arttoy {
  id: string;
  sku: string;
  name: string;
  description: string;
  arrivalDate: string; // ISO date
  availableQuota: number;
  posterPicture: string; // image URL/path
  createdAt: string;
  updatedAt: string;
}
```

### Session (NextAuth)

```typescript
interface Session {
  user: {
    _id: string;
    name: string;
    email: string;
    token: string; // JWT
    iat: number;
    exp: number;
    jti: string;
  };
}
```

---

## API Integration

### Backend API

- **Base URL**: Configured via `NEXT_PUBLIC_BACKEND_API_URL` environment
  variable
- **Endpoints**:
  - `POST /api/v1/auth/register` - User registration
  - `POST /api/v1/auth/login` - User login
  - `GET /api/v1/arttoys` - Get all art toys
  - `GET /api/v1/arttoys/:id` - Get single art toy
  - `POST /api/v1/arttoys` - Create art toy (admin only)
  - `PUT /api/v1/arttoys/:id` - Update art toy (admin only)
  - `DELETE /api/v1/arttoys/:id` - Delete art toy (admin only)

### Frontend API Client

- Generic `apiFetch<T>()` function in `libs/api-client.ts`
- React Query hooks: `useApiQuery`, `useApiMutation`
- Automatic error handling and loading states

---

## Environment Variables

### Required Variables

```env
NEXT_PUBLIC_BACKEND_API_URL=          # Backend API base URL (e.g., http://localhost:5000)
NEXT_PUBLIC_API_URL=      # Public API URL for client-side (optional)
NEXTAUTH_URL=             # NextAuth callback URL
NEXTAUTH_SECRET=          # NextAuth encryption secret
```

---

## Development Workflow

### Running the Project

```bash
npm run dev          # Development server with Turbopack
npm run build        # Production build
npm run start        # Production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
```

### Git Hooks

- **Pre-commit**: Runs lint-staged (ESLint + Prettier)
- **Staged files**: Automatically fixed and formatted

### Code Style

- **ESLint**: TypeScript, React, Next.js rules
- **Prettier**: Consistent formatting
- **Convention**: Documented in `CONVENTION.md`

---

## Current Development Focus

### Active Branch: `feat/middleware`

Working on implementing protected routes and access control middleware.

### Immediate TODOs

1. **Enable Middleware Protection**
   - Configure matcher in `middleware.ts`
   - Protect admin routes (`/arttoy-management`)
   - Protect member routes (`/myorder`)

2. **Art Toy CRUD for Admin**
   - Create admin dashboard
   - Implement add/edit/delete forms
   - Validate arrival date constraints

3. **Pre-Order System**
   - Design order data model
   - Implement cart state management
   - Create order management pages
   - Enforce business rules (max 5 items, 1 order per toy)

---

## Component Examples

### Art Toy Card

- **Location**: `components/arttoy/arttoy-card.tsx`
- **Features**:
  - Responsive card with image
  - Dialog for detailed view
  - Pre-order button
  - Date formatting utility
- **Props**: Accepts `Arttoy` interface

### Navbar

- **Location**: `components/navbar.tsx`
- **Features**:
  - Session-aware (shows user info when logged in)
  - Dynamic login/logout buttons
  - Theme toggle
  - Responsive navigation links

---

## Testing & Quality

### Current Setup

- ESLint with strict TypeScript rules
- Type checking via `tsc`
- Pre-commit hooks prevent bad commits

### Recommended Additions

- [ ] Unit tests (Jest/Vitest)
- [ ] Component tests (React Testing Library)
- [ ] E2E tests (Playwright/Cypress)
- [ ] API integration tests

---

## Deployment Considerations

### Build Process

- Next.js static optimization
- Turbopack for faster builds
- Image optimization (Next.js Image component)

### Performance

- Server components for static content
- Client components for interactivity
- React Query caching
- Code splitting

### Security

- [ ] Implement CSRF protection
- [ ] Rate limiting on API routes
- [ ] Input sanitization
- [ ] Secure password hashing (backend)
- [ ] Environment variable validation

---

## Known Issues & Limitations

1. **Middleware Disabled**: Protected routes not enforced (matcher is empty
   array)
2. **Mock Data**: Art toys page uses hardcoded data
3. **No Order System**: Pre-order functionality not implemented
4. **Missing Admin UI**: CRUD operations for art toys incomplete
5. **No API Error Handling**: Need user-friendly error messages

---

## Future Enhancements

- [ ] Email verification for registration
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Order history and tracking
- [ ] Admin analytics dashboard
- [ ] Search and filter art toys
- [ ] Pagination for large datasets
- [ ] Image upload for art toys
- [ ] Payment integration
- [ ] Notification system (email/push)

---

## References

- **Next.js Docs**: https://nextjs.org/docs
- **NextAuth.js**: https://next-auth.js.org
- **Shadcn/ui**: https://ui.shadcn.com
- **TanStack Query**: https://tanstack.com/query
- **Radix UI**: https://radix-ui.com
- **API Spec**: See `SWAGGER.md` for detailed API documentation

---

**Last Updated**: November 13, 2025  
**Current Sprint**: Middleware & Access Control Implementation
