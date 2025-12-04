export { cubeCssVariablesLayerFormatter };

const cubeCssVariablesLayerFormatter = {
  name: 'cube/css-variables-layer',
  format: ({ dictionary, options }) => {
    const layerName = options.layerName || 'components';
    const selector = options.selector || ':root';

    const vars = dictionary.allProperties
      .map((token) => `    --${token.name}: ${token.value};`)
      .join('\n');

    return `@layer ${layerName} {\n  ${selector} {\n${vars}\n  }\n}\n`;
  },
};
