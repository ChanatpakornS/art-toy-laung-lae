# Next.js Boilerplate

A modern, production-ready Next.js boilerplate with TypeScript, Tailwind CSS,
and comprehensive development tooling.

## 🚀 Features

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) for utility-first
  styling
- **UI Components**: [Radix UI](https://radix-ui.com/) +
  [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Iconify](https://iconify.design/) for comprehensive icon library
- **Data Fetching**: [TanStack Query](https://tanstack.com/query) for server
  state management
- **Forms**: [TanStack Form](https://tanstack.com/form) +
  [Zod](https://zod.dev/) validation
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Theming**: Dark/Light mode with
  [next-themes](https://github.com/pacocoursey/next-themes)
- **API Client**: Type-safe API client with OpenAPI integration
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks
- **Package Manager**: [pnpm](https://pnpm.io/) for fast, disk-efficient
  installs

## 📋 Prerequisites

- **Node.js** 18.18 or later
- **pnpm** 8.0 or later

## 🛠 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ChanatpakornS/next-js-boilerplate.git
cd next-js-boilerplate
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the
result.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── not-found.tsx      # 404 page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── services/          # Services pages
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── theme/            # Theme provider & toggle
│   ├── footer.tsx        # Footer component
│   └── navbar.tsx        # Navigation component
├── hooks/                # Custom React hooks
│   └── use-mobile.ts     # Mobile detection hook
├── lib/                  # Utility libraries
│   ├── api-client.ts     # API client with type safety
│   └── utils.ts          # Utility functions
└── styles/               # Global styles
    └── globals.css       # Tailwind CSS imports & custom styles
```

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components built on top of
[Radix UI](https://radix-ui.com/). Available components include:

- **Layout**: Card, Separator, Aspect Ratio
- **Navigation**: Breadcrumb, Navigation Menu, Pagination
- **Forms**: Button, Input, Textarea, Select, Checkbox, Radio Group
- **Feedback**: Alert, Toast (Sonner), Progress, Skeleton
- **Overlay**: Dialog, Sheet, Popover, Tooltip, Hover Card
- **Data Display**: Table, Badge, Avatar, Calendar
- **And many more...**

## 🔧 Development Scripts

```bash
# Development
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues automatically
pnpm lint:check       # Strict linting (zero warnings)
pnpm format           # Format code with Prettier

# API Types
pnpm generate:openapi-types  # Generate types from OpenAPI spec
```

## 🔨 Code Quality & Development Tools

### ESLint Configuration

- **Intermediate-level** ESLint setup with TypeScript support
- **React** and **React Hooks** rules optimized for Next.js
- **Import ordering** and **unused imports** detection
- **Accessibility** (a11y) rules for better UX
- **Auto-fixable** formatting and style rules

### Prettier Configuration

- **Consistent** code formatting across the project
- **Integrated** with ESLint for seamless development

### Husky Pre-commit Hooks

- **Automatic** linting and formatting before commits
- **Prevents** commits with linting errors
- **Lint-staged** for fast, incremental checks

## 🌐 API Integration

### Type-safe API Client

The project includes a configured API client with:

- **OpenAPI** type generation
- **TanStack Query** integration
- **Request/Response** type safety
- **Error handling** and loading states

### Generate API Types

```bash
# From local OpenAPI spec
pnpm generate:openapi-types

# The types will be generated in src/lib/openapi-types.ts
```

## 🎨 Theming & Styling

### Tailwind CSS

- **Utility-first** CSS framework
- **Custom design system** with CSS variables
- **Dark/Light mode** support
- **Responsive** design utilities

### Color System

The project uses a custom color system defined in `src/styles/globals.css`:

- **Semantic colors**: `primary`, `secondary`, `accent`, `muted`
- **State colors**: `destructive`, `success`, `warning`
- **UI colors**: `background`, `foreground`, `border`, `input`
- **Auto-switching** for dark/light modes

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Environment Variables

Create a `.env.local` file for environment-specific variables:

```bash
NEXT_PUBLIC_API_URL=https://your-api.com
# Add other environment variables as needed
```

## 📚 Learn More

### Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js
  features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial

### UI & Styling

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Documentation](https://radix-ui.com/)

### Development Tools

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Commit Convention

This project follows
[Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## 💫 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment
- [shadcn](https://github.com/shadcn) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) team for the utility-first approach
