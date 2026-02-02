---
source: Context7 API
library: Next.js
package: next
version: 15.1.8
topic: App Router project setup with TypeScript
fetched: 2026-02-02T12:00:00Z
official_docs: https://nextjs.org/docs
---

# Next.js 15 - App Router Setup with TypeScript

## Quick Start Command

```bash
npx create-next-app@latest
```

Or with other package managers:
```bash
yarn create next-app
pnpm create next-app
bunx create-next-app
```

## Interactive Prompts

When running `create-next-app`, you'll be asked:

```
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to use Turbopack for `next dev`? No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
```

## Non-Interactive Setup (Recommended for Projects)

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --turbopack --use-pnpm
```

### Key CLI Flags:
| Flag | Description |
|------|-------------|
| `--ts, --typescript` | Initialize as TypeScript project (default) |
| `--tailwind` | Initialize with Tailwind CSS (default) |
| `--eslint` | Initialize with ESLint config |
| `--app` | Initialize as App Router project |
| `--src-dir` | Initialize inside a `src/` directory |
| `--turbopack` | Enable Turbopack for faster dev |
| `--import-alias <alias>` | Specify import alias (default "@/*") |
| `--empty` | Initialize an empty project |
| `--use-pnpm` | Use pnpm as package manager |

## TypeScript Configuration

Next.js auto-configures TypeScript:
1. Rename any file to `.ts` or `.tsx`
2. Run `next dev`
3. Next.js automatically installs dependencies and generates `tsconfig.json`

## Project Structure Best Practices (App Router)

```
my-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout (required)
│   │   ├── page.tsx          # Home page (/)
│   │   ├── globals.css       # Global styles
│   │   ├── (routes)/         # Route groups
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   └── api/              # API routes
│   │       └── route.ts
│   ├── components/           # Shared components
│   │   ├── ui/               # UI primitives
│   │   └── features/         # Feature components
│   ├── lib/                  # Utility functions
│   └── types/                # TypeScript types
├── public/                   # Static assets
├── next.config.ts            # Next.js config
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind config
└── package.json
```

## Recommended tsconfig.json Settings

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```
