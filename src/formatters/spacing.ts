import StyleDictionary from 'style-dictionary';
import type { FormatFnArguments } from 'style-dictionary/types';

type Token = {
  name: string;
  value: string | number;
  attributes?: {
    category?: string;
    type?: string;
    item?: string;
  };
};

export const spacingFluid = {
  name: 'css/spacing-fluid',
  format: ({ dictionary }: FormatFnArguments) => {
    const tokens = dictionary.allTokens;

    // ---- CONFIG: tweak these to taste ----
    const minViewport = 360; // px
    const maxViewport = 1240; // px
    const minRem = 1.125; // base space at min viewport
    const maxRem = 1.25; // base space at max viewport
    // --------------------------------------

    const deltaRem = maxRem - minRem;
    const deltaViewport = maxViewport - minViewport;

    const clampExpr = `clamp(${minRem}rem, calc(${minRem}rem + ${deltaRem.toFixed(
      4
    )} * ((100vw - ${minViewport}px) / ${deltaViewport})), ${maxRem}rem)`;

    let css = `:root {\n`;
    css += `  /* Fluid base space unit (Utopia-style) */\n`;
    css += `  --space-unit: ${clampExpr};\n\n`;

    // Now output each spacing token as a multiple of the fluid unit
    css += `  /* Spacing scale derived from primitives.spacing.* */\n`;

    tokens
      .filter(
        (t) =>
          t.attributes?.category === 'spacing' ||
          t.attributes?.type === 'spacing'
      )
      .forEach((t) => {
        const item = t.attributes?.item || t.name; // xxs, xs, sm, md…
        if (item === 'unit') return; // we already handled unit

        const multiplier = Number(t.value); // e.g. 0.75, 1, 1.5...

        css += `  --space-${item}: calc(var(--space-unit) * ${multiplier});\n`;
      });

    css += '}\n';

    return css;
  },
};
