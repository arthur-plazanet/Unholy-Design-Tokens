## 📂 `tokens/intent/README.md`

# Intent Tokens

Intent tokens translate UI states like "success" or "danger" into consistent
visual treatments using semantic tokens.

This is the **developer-facing API** for stateful components.

## When to use intent tokens

- Alerts
- Badges
- Banners
- Form validation
- Toasts
- Buttons (when conveying meaning)
- Tags

## Hard Rules

- **MUST reference semantic**
- **MUST NOT reference primitives**
- **MUST NOT contain raw values**
- **Names reflect UX meaning, not visual result**

## Example

```jsonc
{
  "color": {
    "success": {
      "surface": { "value": "{semantic.color.surface.positive}" },
      "border": { "value": "{semantic.color.border.positive}" },
      "text": { "value": "{semantic.color.text.positive}" },
    },
  },
}
```
