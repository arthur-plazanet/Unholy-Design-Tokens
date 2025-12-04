# Primitives Tokens

Primitives are raw values that will be then used to create more a more complex system.
They are the foundation of the design system.

- Colors defined using a palette (100 to 900 scale)
- Spacing scale
- Radii
- Shadows (if applicable)
- Border widths

## Generate color palette

- Figma plugin: [Color Palette Generator](https://www.figma.com/color-palette-generator/)

```css
:root {
  --color-blue-100: #dbeafe;
  --color-blue-200: #bfdbfe;
  --color-blue-300: #93c5fd;
  --color-blue-400: #60a5fa;
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-blue-700: #1d4ed8;
  --color-blue-800: #1e40af;
  --color-blue-900: #1e3a8a;
}
```

## Hard Rules

- **Only raw values**
- **No references to other tokens**
- **No meaning-based names**
- **Minimal changes over time**

## Examples

```jsonc
{
  "color": {
    "blue": { "500": { "value": "#3b82f6" } },
  },
  "spacing": {
    "8": { "value": "0.5rem" },
  },
  "border": {
    "radius": { "8": { "value": "8px" } },
  },
}
```
