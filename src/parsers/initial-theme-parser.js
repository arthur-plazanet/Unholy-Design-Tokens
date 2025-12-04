import tinycolor from 'tinycolor2'

export { parseInitialTheme }

const initialTheme = {
  primary: '#ff0000',
  secondary: ' #00ff00',
  danger: '#ff0000',
}

function generateThemeTokens(theme = initialTheme) {
  const themeTokens = {}
  Object.keys(theme).forEach((key) => {
    const color = theme[key]
    const hslColor = tinycolor(color).toHsl()
    themeTokens[`color-${key}-hue`] = (Math.round(hslColor.h * 100) / 100).toString() + 'deg'
    themeTokens[`color-${key}-saturation`] = Math.round(hslColor.s * 100).toString() + '%'
    themeTokens[`color-${key}-lightness`] = Math.round(hslColor.l * 100).toString() + '%'
    themeTokens[`color-${key}-opacity`] = (Math.round(hslColor.a * 100) / 100).toString()
    themeTokens[`color-${key}`] = hslColor
  })
  return themeTokens
}

const parseInitialTheme = {
  name: 'initial-theme-parser',
  pattern: /initial-theme\.json$/,
  parser: ({ contents, filePath }) => {
    const object = JSON.parse(contents)
    const themeTokens = generateThemeTokens(object)
    return themeTokens
  },
}
