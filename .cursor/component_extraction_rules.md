
## Component extraction rules (100% Coverage - 1:1 UI Match)

### CRITICAL: Always extract ALL properties from Figma for 1:1 UI match

#### Step 1: Inspect Component Property Definitions
**MANDATORY** - Before extracting visual properties, ALWAYS extract ALL component property definitions from `node.componentPropertyDefinitions`:

- **VARIANT properties** (e.g., "👥 Variant", "Variant") - Extract ALL variant options
- **BOOLEAN properties** (e.g., "🐣 Strong", "🎛️ Icon Lead") - Extract as boolean props
- **TEXT properties** - Extract as string props
- **INSTANCE_SWAP properties** - Extract as component swap props
- **SIZE properties** (e.g., "👥 Size") - Extract all size options

**Example:**
```typescript
// Extract ALL properties, not just Variant and Size
for (const [propName, propDef] of Object.entries(node.componentPropertyDefinitions)) {
  // Normalize property name (remove emojis, normalize to camelCase)
  const normalizedName = propName.replace(/[👥🐣🎛️]/g, '').trim().toLowerCase().replace(/\s+/g, '-');
  
  if (prop.type === 'VARIANT' && prop.variantOptions) {
    // Extract all variant options
  } else if (prop.type === 'BOOLEAN') {
    // Extract as boolean prop (e.g., iconLead, strong)
  }
}
```

#### Step 2: Extract Visual Properties from Figma Node
Inspect the Figma node to extract exact values for ALL visual properties:

### 1. Colors & Fills
- **SOLID fills** - Color with opacity (extract exact hex/rgba values)
- **Linear gradients** - With angle and color stops
- **Radial gradients** - Circular gradients
- **Angular gradients** - Conic gradients
- **Diamond gradients** - Elliptical gradients
- **Image fills** - With scale modes
- **Bound variables** - Resolved to actual values, then map to tokens

### 2. Strokes
- **Stroke color** - With opacity (extract exact values)
- **Stroke width** - Exact pixel values (e.g., 1px, 2px)
- **Stroke alignment** - Inside, outside, center (affects box-sizing)
- **Stroke cap** - Round, square, none
- **Stroke join** - Miter, bevel, round
- **Dash patterns** - Custom dash arrays
- **Miter limit** - For sharp corners

### 3. Effects & Shadows
- **Drop shadows** - Offset (x, y), blur, spread, color (extract exact values)
- **Inner shadows** - Inset shadows with all properties
- **Layer blur** - Blur effects
- **Background blur** - Backdrop blur
- **Multiple effects** - All effects combined in order

### 4. Layout (Auto Layout)
- **Layout direction** - Horizontal/vertical (affects flex-direction)
- **Padding** - All sides (top, right, bottom, left) - extract exact pixel values
- **Gap spacing** - Item spacing (extract exact pixel values)
- **Layout wrap** - Wrap behavior
- **Primary axis alignment** - Min, center, max, space-between (affects justify-content)
- **Counter axis alignment** - Min, center, max, stretch (affects align-items)
- **Layout grow** - Flex grow behavior

### 5. Typography
- **Font family** - Exact font name (e.g., "Inter", "Whyte")
- **Font size** - Pixel values (e.g., 9px, 11px, 13px)
- **Font weight** - Numeric weight (e.g., 450, 550)
- **Line height** - Pixels or percentage (extract exact value)
- **Letter spacing** - Pixels or percentage (extract exact value)
- **Text alignment** - Horizontal (left, center, right, justified)
- **Text alignment** - Vertical (top, center, bottom)
- **Text decoration** - Underline, strikethrough
- **Text case** - Uppercase, lowercase, title case
- **Paragraph spacing** - Indent and spacing

### 6. Dimensions
- **Width** - Exact pixel values (extract from node.width)
- **Height** - Exact pixel values (extract from node.height)
- **Min width** - Minimum constraints
- **Max width** - Maximum constraints
- **Min height** - Minimum constraints
- **Max height** - Maximum constraints

### 7. Constraints
- **Horizontal constraints** - Min, center, max, stretch, scale
- **Vertical constraints** - Min, center, max, stretch, scale

### 8. Transform
- **Rotation** - Degrees
- **Scale X/Y** - Scale factors
- **Skew X/Y** - Skew angles

### 9. Visual Properties
- **Opacity** - Node opacity (0-1)
- **Blend mode** - Mix blend modes
- **Clipping** - Overflow hidden
- **Masking** - Is mask property

### 10. Border Radius (CRITICAL - Often Missed!)
- **Corner radius** - Extract from `node.cornerRadius` (single value for all corners)
- **Corner radii** - Extract from `node.rectangleCornerRadii` (array of 4 values: [topLeft, topRight, bottomRight, bottomLeft])
- **IMPORTANT**: Always extract border radius from EACH variant instance, not just the base component
- **Example**: Badge has `cornerRadius: 5` - extract this exact value and use it in CSS

```typescript
// Extract corner radius
let cornerRadius: number | undefined;
let cornerRadii: [number, number, number, number] | undefined;

if (node.cornerRadius !== undefined) {
  cornerRadius = node.cornerRadius; // Extract exact value (e.g., 5)
} else if (node.rectangleCornerRadii) {
  const radii = node.rectangleCornerRadii;
  if (Array.isArray(radii) && radii.length === 4) {
    cornerRadii = [radii[0], radii[1], radii[2], radii[3]];
  }
}
```

### 11. Component Properties (CRITICAL - Often Missed!)
- **Extract ALL component property definitions** from `node.componentPropertyDefinitions`
- **Map component properties to React props**:
  - VARIANT properties → TypeScript union types
  - BOOLEAN properties → boolean props (e.g., `iconLead?: boolean`, `strong?: boolean`)
  - TEXT properties → string props
  - SIZE properties → size variants

**Example for Badge:**
- "👥 Variant" → `variant?: BadgeVariant` (15 options)
- "🐣 Strong" → `strong?: boolean` (True/False)
- "🎛️ Icon Lead" → `iconLead?: boolean` (True/False)

### Step 3: Extract Properties for EACH Variant
**MANDATORY** - Extract properties from EACH variant instance, not just the base:

```typescript
// Extract properties for each variant if component set
const variantPropertiesMap = new Map<string, ExtractedProperties>();
if (node.type === 'COMPONENT_SET' && variantInstances.length > 0) {
  for (const variant of variantInstances) {
    // Fetch full node data for each variant
    const { node: fullVariantNode } = await fetchNode(fileKey, variant.id);
    const variantProps = extractAllProperties(fullVariantNode);
    
    // Extract variant-specific properties:
    // - Border radius (may differ per variant)
    // - Colors (may differ per variant)
    // - Padding (may differ per variant)
    // - Typography (may differ per variant)
    
    variantPropertiesMap.set(variantName, variantProps);
  }
}
```

### Step 4: Generate Component Code
1. **Generate TypeScript props** from ALL component property definitions
2. **Generate CSS** using extracted properties with exact values
3. **Map to tokens** where possible, but preserve exact Figma values as fallbacks
4. **Generate variant-specific CSS** from variantPropertiesMap

### Step 5: Validation Checklist
Before considering extraction complete, verify:

- [ ] ALL component property definitions extracted (Variant, Strong, Icon Lead, Size, etc.)
- [ ] Border radius extracted from EACH variant (not just base)
- [ ] All visual properties extracted (fills, strokes, effects, layout, typography, dimensions)
- [ ] Component props match Figma component properties exactly
- [ ] CSS uses exact Figma values (with token fallbacks)
- [ ] Variant-specific styles generated from variantPropertiesMap
- [ ] 1:1 visual match verified in Storybook

### Important Rules

1. **NEVER hardcode values** - Always extract from Figma, then map to tokens
2. **Extract from EACH variant** - Properties may differ between variants
3. **Preserve exact Figma values** - Use exact pixel values, then map to tokens as fallback
4. **Component properties = React props** - Map Figma component properties directly to React props
5. **Border radius is per-variant** - Extract from each variant instance, not just base
6. **Icon Lead is a component property** - Extract as boolean prop, not inferred from icon presence

### 12. Icon Integration (CRITICAL - Always Enable for Icon Instances)
- **When a component has icon instances** from Figma, ALWAYS enable icon integration in Storybook
- **Use the icon repository** (`packages/docs/stories/utils/iconSelector.tsx`) for icon selection
- **Add icon argType** using `createIconArgType()` helper
- **Use `renderIcon()` helper** to render icons from icon names
- **Enable icon selector** in Storybook controls for interactive icon selection

**Example:**
```typescript
import { createIconArgType, renderIcon } from './utils/iconSelector';

const meta = {
  argTypes: {
    iconLead: {
      control: 'boolean',
    },
    icon: {
      ...createIconArgType(),
      description: 'Select an icon from the icon repository',
      if: { arg: 'iconLead', eq: true },
    },
  },
};

// In stories:
render: (args) => (
  <Component 
    {...args} 
    icon={args.iconLead && args.icon ? renderIcon(args.icon) : undefined}
  />
),
```

**See:** `packages/docs/stories/utils/ICON_INTEGRATION.md` for complete guide.

---

**Always use the variables and tokens, strictly no hard coded values. But first, extract exact values from Figma, then map to tokens.**

**Always enable icon integration for components with icon instances - use the icon repository for all icon selection.**
