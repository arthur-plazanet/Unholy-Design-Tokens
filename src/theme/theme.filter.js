const themeCategories = [
  'space',
  'spacing',
  'border',
  'border',
  'shadow',
  'breakpoint',
  'font',
  'text',
  'component',
];
/**
 * List of categories part of the generated private and public theme
 * See category: https://styledictionary.com/info/tokens/#category--type--item
 *
 * @param {*} token
 * @returns {boolean}
 */
export function isPartOfTheme(token) {
  return themeCategories.includes(token.attributes?.category);
}

export function filterThemeTokens(token) {
  return isPartOfTheme(token);
}
