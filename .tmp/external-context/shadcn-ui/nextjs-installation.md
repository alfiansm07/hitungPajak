---
source: Context7 API
library: shadcn/ui
package: shadcn
topic: Installation and setup with Next.js
fetched: 2026-02-02T12:00:00Z
official_docs: https://ui.shadcn.com/docs
---

# shadcn/ui - Next.js Installation & Setup

## Prerequisites

- Next.js 13.4+ with App Router
- TypeScript
- Tailwind CSS

## Step 1: Initialize shadcn/ui

```bash
npx shadcn@latest init
```

You'll be prompted for configuration:
- Style (New York / Default)
- Base color
- CSS variables (yes/no)

This generates `components.json` for project-specific settings.

## Step 2: Quick Start with Components

Initialize with specific components in one command:

```bash
npx shadcn init sidebar-01 login-01
```

## Essential Components for Forms & Layouts

### Install Core Form Components

```bash
# Button - Primary action component
npx shadcn@latest add button

# Input - Text input fields
npx shadcn@latest add input

# Card - Container for content
npx shadcn@latest add card

# Form - Complete form system with validation
npx shadcn@latest add form

# Label - Accessible form labels
npx shadcn@latest add label

# Select - Dropdown selection
npx shadcn@latest add select

# Checkbox - Boolean input
npx shadcn@latest add checkbox
```

### Install Layout Components

```bash
# Sidebar - Navigation sidebar
npx shadcn@latest add sidebar

# Sheet - Slide-out panel
npx shadcn@latest add sheet

# Dialog - Modal dialogs
npx shadcn@latest add dialog

# Tabs - Tabbed content
npx shadcn@latest add tabs

# Separator - Visual divider
npx shadcn@latest add separator
```

### Batch Install (Recommended)

```bash
npx shadcn@latest add button input card form label select checkbox dialog sheet tabs separator
```

## Project Structure After Installation

```
src/
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       ├── form.tsx
│       └── ...
├── lib/
│   └── utils.ts          # cn() utility for classnames
└── app/
    └── globals.css       # Updated with CSS variables
```

## Usage Example

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LoginForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button className="w-full">Sign In</Button>
      </CardContent>
    </Card>
  )
}
```

## Recommended Components by Category

### Forms
- `form` - React Hook Form integration with Zod
- `input` - Text inputs
- `textarea` - Multi-line text
- `select` - Dropdowns
- `checkbox` - Boolean toggles
- `radio-group` - Single selection
- `switch` - Toggle switches
- `slider` - Range input

### Layouts
- `card` - Content containers
- `separator` - Visual dividers
- `sheet` - Side panels
- `dialog` - Modal windows
- `tabs` - Tabbed interfaces
- `accordion` - Collapsible sections

### Feedback
- `alert` - Status messages
- `toast` - Notifications (via sonner)
- `skeleton` - Loading states
- `progress` - Progress indicators
