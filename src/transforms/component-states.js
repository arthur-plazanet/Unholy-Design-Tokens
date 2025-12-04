export const componentStatesTransform = {
  name: 'custom/component-state',
  type: 'value',
  filter: (token) => {
    return (
      token.attributes?.category === 'state' &&
      token.attributes?.type !== 'base' &&
      token.attributes?.item === 'bg' &&
      token.attributes?.subitem === 'lightness'
    )
  },
  transform: function (token) {
    const ratio = token['value']
    return ratio
    const sign = '-' //ratio >= 0 ? '+' : '-'
    return `calc(var(--state-base-bg-lightness) ${sign} ${Math.abs(ratio)})`
  },
}
