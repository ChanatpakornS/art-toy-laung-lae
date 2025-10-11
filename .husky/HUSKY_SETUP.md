# Husky Pre-commit Setup

This project now has Husky configured to run linting and formatting checks
before each commit.

## What happens on commit:

1. **Lint-staged** runs on staged files only
2. **ESLint** checks and auto-fixes JavaScript/TypeScript files
3. **Prettier** formats all files
4. If linting fails with errors, the commit is blocked
5. If everything passes, the commit proceeds

## Configuration:

- **Pre-commit hook**: `.husky/pre-commit`
- **Lint-staged config**: `package.json` (lint-staged section)
- **ESLint config**: `eslint.config.js`
- **Prettier config**: `.prettierrc`

## Manual commands:

```bash
# Run linting manually
pnpm lint

# Auto-fix linting issues
pnpm lint:fix

# Check with zero warnings (strict)
pnpm lint:check

# Format code manually
pnpm format
```

## How it protects code quality:

✅ **Prevents commits with linting errors** ✅ **Automatically formats code on
commit** ✅ **Only processes staged files (fast)** ✅ **Maintains consistent
code style** ✅ **Catches common bugs and issues**
