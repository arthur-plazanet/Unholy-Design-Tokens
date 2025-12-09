export { cubeCssVariablesLayerFormatter, cubeCssLayerFormatter };

const cubeCssLayerFormatter = (children) => {
  console.log('📟 - children → ', children);
  const layerName = 'cube';
  const selector = ':root';
  // if file exists, append to it

  return `@layer ${layerName} {\n  ${children}\n  }\n`;
};

const cubeCssVariablesLayerFormatter = {
  name: 'cube/css-variables-layer',
  format: ({ dictionary, options }) => {
    const layerName = options.layerName || 'cube';
    const selector = options.selector || ':root';

    console.log('📟 - dictionary.allProperties → ', dictionary.allTokens);
    console.log('📟 - dictionary → ', dictionary);
    const vars = dictionary.allTokens
      .map((token) => `    --${token.name}: ${token.value};`)
      .join('\n');

    const tt = `@layer ${layerName} {\n    ${selector} {  \n${vars}\n  }\n}\n`;

    return cubeCssLayerFormatter(tt);
  },
};
