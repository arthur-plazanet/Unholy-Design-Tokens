# i18next analogy with Design Tokens

## Hard-coded-string: the "old way”

Before having translation tools, you hard-code strings directly in components:

```tsx
// React, Vue, whatever
<Alert type="success">Profile updated successfully!</Alert>
```

Strings are hard-coded:

- Not reusable
- Not translatable
- Not themeable per language/brand/product

So you introduce **i18next**.

---

## Layer 1 – Translation resources (raw data)

You define your resources:

```tsx
// en/translation.json
{
  "profile": {
    "updated": "Profile updated successfully!"
  },
  "errors": {
    "network": "Something went wrong. Please try again."
  }
}

```

```tsx
// fr/translation.json
{
  "profile": {
    "updated": "Profil mis à jour avec succès !"
  },
  "errors": {
    "network": "Une erreur est survenue. Veuillez réessayer."
  }
}

```

This is just **structured data**:

- One language per file
- Raw strings
- No component logic

Think of it as **your translation “database”**, nothing more.

---

## Layer 2 – Meaningful keys & namespaces

Then you start organizing things:

```tsx
// common.json
{
  "actions": {
    "save": "Save",
    "cancel": "Cancel"
  },
  "status": {
    "success": "Success",
    "error": "Error"
  }
}

// profile.json
{
  "messages": {
    "updated": "Profile updated successfully!"
  }
}

```

You now have:

- **Namespaces**: `common`, `profile`, `errors`
- **Meaningful keys**: `actions.save`, `status.success`, `messages.updated`

Developers don’t write “Sauvegarder” or “Speichern” —

they write:

```tsx
t('common.actions.save');
t('profile.messages.updated');
```

You’ve created a **semantic layer** of _meaningful keys_ above raw strings.

---

## Layer 3 – Component usage / intent

Now imagine an `Alert`:

```tsx
function Alert({ intent }: { intent: 'success' | 'error' | 'warning' }) {
  const { t } = useTranslation('common');

  const titleKey = {
    success: 'status.success',
    error: 'status.error',
    warning: 'status.warning',
  }[intent];

  return (
    <div className={`alert alert--${intent}`}>
      <strong>{t(titleKey)}</strong>
      {/* ... */}
    </div>
  );
}
```

From the component’s perspective:

- It doesn’t know the language
- It doesn’t know the string content
- It only knows **“I am an alert with `intent='success'`”**

And that **intent** is mapped to a key like `status.success`,

which resolves, via resources, to the actual text.

---

## 🧩 Put it all together

We essentially have:

1. **Raw translations (resources)**
   - JSON per language
   - Strings only
2. **Meaningful keys / namespaces**
   - `common.actions.save`
   - `status.success`
   - `profile.messages.updated`
3. **Component-facing API (intent / usage)**
   - Components call `t(key)`
   - Or even higher-level things like `getAlertCopy('success')`

No one doing UI work should touch the raw strings directly anymore.

They work with **keys and intent**.

> resources = raw values, keys = semantic meaning, `t()` calls = component intent.
