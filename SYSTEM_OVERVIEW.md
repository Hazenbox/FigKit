# System Overview: FigKit Design System

## 🏗️ Architecture Overview

This is a **monorepo-based design system** that bridges **Figma designs** to **production-ready React components** with **automated token synchronization**. The system supports **multiple brands** and **themes** (light/dark) through CSS variables.

```
┌─────────────────────────────────────────────────────────────┐
│                    FIGMA DESIGN FILES                        │
│  (Design tokens, component specs, variables)                │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              FIGMA MCP (Micro-Cloud Provider)                │
│  • Pull tokens from Figma API or local files                │
│  • Map Figma variables → Semantic token paths               │
│  • Pull component specs → Generate React code               │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        ▼                             ▼
┌──────────────────┐        ┌──────────────────┐
│  Token Pipeline  │        │ Component Pipeline│
└──────────────────┘        └──────────────────┘
        │                             │
        ▼                             ▼
┌─────────────────────────────────────────────┐
│         PACKAGES (Published to npm)         │
│  • @figkit/tokens  - JSON token files       │
│  • @figkit/themes  - CSS variables          │
│  • @figkit/ui      - React components       │
│  • @figkit/patterns - Composed patterns     │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│         CONSUMER APPLICATIONS                │
│  • Import components & themes                │
│  • Set data-brand & data-theme attributes   │
│  • Components automatically adapt           │
└─────────────────────────────────────────────┘
```

---

## 📦 Monorepo Structure

```
figkit/
├── packages/
│   ├── ui/              # React component library
│   │   ├── src/
│   │   │   ├── button/   # Button component
│   │   │   ├── checkbox/ # Checkbox component
│   │   │   ├── tab/      # Tab/Tabs components
│   │   │   └── components.ts  # Central exports
│   │   └── dist/         # Built package (published)
│   │
│   ├── themes/           # CSS theme compilation
│   │   ├── build.js      # Generates tokens.css
│   │   └── dist/
│   │       └── tokens.css  # All brand/theme CSS vars
│   │
│   ├── tokens/           # Design tokens (source)
│   │   ├── dist/
│   │   │   ├── default.light.json
│   │   │   ├── default.dark.json
│   │   │   ├── figjam.light.json
│   │   │   └── ... (8 brand/theme combos)
│   │   └── src/
│   │       └── tokens.json  # Legacy format
│   │
│   ├── patterns/         # Composed UI patterns
│   │   └── src/          # Built on top of @figkit/ui
│   │
│   ├── docs/             # Storybook documentation
│   │   ├── .storybook/   # Storybook config
│   │   └── stories/      # Component stories
│   │
│   └── figma-mcp/        # Figma integration tooling
│       ├── scripts/
│       │   ├── pull-tokens-from-files.ts
│       │   ├── pull-component.ts
│       │   └── utils/    # Token mapping, codegen, etc.
│       └── config/
│           ├── mapping.json  # Figma → Semantic paths
│           └── pairs.json     # WCAG contrast pairs
│
├── variables/            # Source token files (from Figma)
│   ├── colors.default.light.json
│   ├── colors.default.dark.json
│   ├── colors.figjam.light.json
│   ├── colors.figjam.dark.json
│   ├── colors.devmode.light.json
│   ├── colors.devmode.dark.json
│   ├── colors.slides.light.json
│   ├── colors.slides.dark.json
│   ├── typography.json
│   └── sizing.json
│
└── apps/
    └── sandbox/          # Demo app for testing
```

---

## 🔄 How It Works: Token Flow

### Step 1: Source Tokens (Figma → Local Files)

**Location**: `variables/` folder

Designers export tokens from Figma into JSON files:
- `colors.{brand}.{theme}.json` - Color tokens per brand/theme
- `typography.json` - Universal typography tokens
- `sizing.json` - Universal spacing & radius tokens

**Example** (`variables/colors.default.light.json`):
```json
{
  "✦/_text/text-default": {
    "value": "rgba(0, 0, 0, 0.9)"
  },
  "✦/_bg/bg-brand": {
    "value": "#0d99ff"
  }
}
```

### Step 2: Process Tokens (Map & Transform)

**Command**: `pnpm mcp:pull:tokens`

**What happens**:
1. Reads all files from `variables/` folder
2. Maps Figma names → Semantic paths using `mapping.json`:
   ```
   ✦/_text/text-default → color.text.default
   ✦/_bg/bg-brand → color.bg.brand
   Spacers/spacer-2 → space.2
   ```
3. Merges typography & sizing into each brand/theme
4. Generates Style Dictionary format files:
   - `packages/tokens/dist/default.light.json`
   - `packages/tokens/dist/default.dark.json`
   - `packages/tokens/dist/figjam.light.json`
   - ... (8 total files)

**Example output** (`packages/tokens/dist/default.light.json`):
```json
{
  "color": {
    "text": {
      "default": { "value": "rgba(0, 0, 0, 0.9)" }
    },
    "bg": {
      "brand": { "value": "#0d99ff" }
    }
  },
  "space": {
    "2": { "value": "8px" },
    "3": { "value": "12px" }
  }
}
```

### Step 3: Build CSS (Tokens → CSS Variables)

**Command**: `pnpm build:tokens`

**What happens**:
1. Reads all `{brand}.{theme}.json` files from `packages/tokens/dist/`
2. Converts nested structure to CSS variables
3. Wraps each brand/theme in attribute selector
4. Outputs single file: `packages/themes/dist/tokens.css`

**Example output** (`packages/themes/dist/tokens.css`):
```css
:root[data-brand="default"][data-theme="light"] {
  --color-text-default: rgba(0, 0, 0, 0.9);
  --color-bg-brand: #0d99ff;
  --space-2: 8px;
  --space-3: 12px;
  /* ... all tokens ... */
}

:root[data-brand="default"][data-theme="dark"] {
  --color-text-default: rgba(255, 255, 255, 0.9);
  --color-bg-brand: #0d99ff;
  /* ... dark theme tokens ... */
}

:root[data-brand="figjam"][data-theme="light"] {
  --color-text-default: rgba(0, 0, 0, 0.9);
  --color-bg-brand: #9747ff;  /* FigJam purple */
  /* ... FigJam tokens ... */
}

/* ... 8 total brand/theme combinations ... */
```

### Step 4: Components Use CSS Variables


**Example** (`packages/ui/src/button/button.css`):
```css
.button--primary {
  background: var(--color-bg-brand-default, var(--color-bg-brand, #0d99ff));
  color: var(--color-text-onbrand, #ffffff);
  border-radius: var(--radius-sm, 2px);
  padding: 0 var(--space-3, 12px);
  font-family: var(--body-medium-fontFamily, 'Inter');
  font-size: var(--body-medium-fontSize, 11px);
}
```

**Key points**:
- Components use **only CSS variables** (no hardcoded values)
- Variables automatically adapt to `data-brand` and `data-theme` attributes
- Fallback values ensure components work even if tokens are missing

---

## 🎨 Brand/Theme System

### How Brand/Theme Switching Works

1. **Set attributes on HTML root**:
   ```html
   <html data-brand="default" data-theme="light">
   ```

2. **CSS attribute selectors activate**:
   ```css
   :root[data-brand="default"][data-theme="light"] {
     --color-bg-brand: #0d99ff;  /* Default blue */
   }
   
   :root[data-brand="figjam"][data-theme="light"] {
     --color-bg-brand: #9747ff;  /* FigJam purple */
   }
   ```

3. **Components automatically update**:
   - All components use `var(--color-bg-brand)`
   - When attributes change, CSS variables change
   - Components re-render with new styles

### Supported Brands & Themes

- **Brands**: `default`, `figjam`, `devmode`, `slides`
- **Themes**: `light`, `dark`
- **Total combinations**: 8 (4 brands × 2 themes)

### Storybook Integration

Storybook toolbar controls automatically set attributes:
- **Brand dropdown**: default, figjam, devmode, slides
- **Theme toggle**: light, dark

The decorator in `packages/docs/.storybook/preview.tsx` watches for changes and updates `document.documentElement` attributes.

---

## 🧩 Component Development Workflow

### Option 1: Pull from Figma (Automated)

**Command**: `pnpm mcp:pull:component <figma-url>`

**What happens**:
1. Fetches component node from Figma API
2. Extracts design tokens (colors, spacing, radius)
3. Maps Figma variables to semantic paths
4. Generates files:
   - `packages/ui/src/{component}/{Component}.tsx`
   - `packages/ui/src/{component}/{component}.css`
   - `packages/docs/stories/{Component}.stories.tsx`
5. Auto-updates `packages/ui/src/components.ts`

**Example**:
```bash
pnpm mcp:pull:component "https://www.figma.com/design/...?node-id=2012-48557"
```

### Option 2: Manual Development

1. Create component in `packages/ui/src/{component}/`
2. Write CSS using **only CSS variables**
3. Add Storybook stories in `packages/docs/stories/`
4. Export in `packages/ui/src/components.ts`

---

## 📦 Package Relationships

```
┌─────────────────┐
│ @figkit/tokens  │  (JSON token files)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ @figkit/themes  │  (CSS variables built from tokens)
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌─────────────────┐    
│  @figkit/ui     │      │ @figkit/patterns│
│  (Components)   │◄─────┤ (Composed)      │
└─────────────────┘      └─────────────────┘
```

**Dependencies**:
- `@figkit/ui` → `@figkit/themes` (peer dependency, CSS import)
- `@figkit/patterns` → `@figkit/ui` (uses components)
- `@figkit/themes` → `@figkit/tokens` (builds from JSON)

**Consumer apps** typically install:
- `@figkit/ui` (components)
- `@figkit/themes` (CSS variables)

---

## 🚀 How Teams Consume It

### Installation

```bash
npm install @figkit/ui @figkit/themes
```

### Setup

**1. Import theme CSS** (in app entry point):
```tsx
// main.tsx or App.tsx
import '@figkit/themes/tokens.css';
```

**2. Set brand/theme** (on app mount):
```tsx
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-brand', 'default');
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);
  
  return <YourApp />;
}
```

**3. Use components**:
```tsx
import { Button, Checkbox, Tabs } from '@figkit/ui';
import '@figkit/ui/index.css';

function MyComponent() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Checkbox label="Accept terms" />
      <Tabs items={[{ label: 'Tab 1' }, { label: 'Tab 2' }]} />
    </div>
  );
}
```

### Dynamic Theme Switching

```tsx
function ThemeSwitcher() {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle {theme}
    </button>
  );
}
```

---

## 🛠️ Key Technologies

### Build Tools
- **pnpm**: Package manager with workspaces
- **tsup**: Fast TypeScript bundler
- **Style Dictionary**: Token transformation
- **Vite**: Build tool for Storybook

### Development
- **TypeScript**: Type safety throughout
- **React 18/19**: Component framework
- **Storybook**: Component documentation
- **Vitest**: Unit testing
- **Playwright**: Visual regression testing

### Token System
- **CSS Variables**: Runtime theming
- **Attribute Selectors**: Brand/theme scoping
- **Style Dictionary**: Token format conversion

---

## 🔧 Development Commands

### Token Workflow
```bash
# Pull tokens from variables/ folder
pnpm mcp:pull:tokens

# Build CSS from tokens
pnpm build:tokens

# Check for token changes
pnpm mcp:diff
```

### Component Development
```bash
# Pull component from Figma
pnpm mcp:pull:component <figma-url>

# Build UI package
pnpm -F @figkit/ui build

# Run Storybook
pnpm -F @figkit/docs storybook
```

### Testing
```bash
# Run all tests
pnpm test

# Accessibility tests
pnpm test:a11y

# Visual regression
pnpm visual:test
```

### Publishing
```bash
# Create changeset
pnpm changeset

# Version bump
pnpm release:version

# Publish to npm
pnpm release:publish
```

---

## 🎯 Key Design Principles

1. **Token-Driven**: All styling uses CSS variables from tokens
2. **Multi-Brand**: Single codebase supports multiple brands
3. **Multi-Theme**: Automatic light/dark mode support
4. **Figma-First**: Design tokens sourced from Figma
5. **Type-Safe**: Full TypeScript support
6. **Accessible**: WCAG contrast checks, a11y testing
7. **Automated**: Figma → Code generation pipeline

---

## 📊 Data Flow Summary

```
Figma Variables
    ↓
variables/*.json (local files)
    ↓
pnpm mcp:pull:tokens
    ↓
packages/tokens/dist/*.json (Style Dictionary format)
    ↓
pnpm build:tokens
    ↓
packages/themes/dist/tokens.css (CSS variables)
    ↓
Components use var(--token-name)
    ↓
Runtime: data-brand + data-theme attributes
    ↓
CSS attribute selectors activate
    ↓
Components render with correct styles
```

---

## 🎓 Next Steps

1. **Read component docs**: `packages/ui/README.md`
2. **Explore Storybook**: `pnpm -F @figkit/docs storybook`
3. **Check token system**: `TOKEN_SYSTEM.md`
4. **Learn Figma integration**: `FIGMA_COMPONENT_PULL.md`
5. **See publishing guide**: `PUBLISHING.md`

---

This system ensures **design consistency**, **developer productivity**, and **maintainability** across all products using the design system.

