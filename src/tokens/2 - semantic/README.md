## 📂 `tokens/semantic/README.md`

# Semantic Tokens

Semantic tokens define **meaning** inside the design system.

They represent how UI elements behave visually:

- surfaces
- borders
- text roles
- interactive states (subtle, strong)

## Hard Rules

- **MUST reference primitives**
- **No raw values**
- **Names describe purpose, not color**
- **Stable across themes (light/dark/brand)**

## Examples

```jsonc
{
  "color": {
    "surface": {
      "default": { "value": "{primitives.color.neutral.0}" },
      "subtle": { "value": "{primitives.color.neutral.50}" },
    },
  },
}
```
