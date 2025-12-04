export const filterBuildTimeSCSS = {
  name: 'custom/filter-build-time-scss',
  // async is optional
  filter: async (token, options) => {
    return token.attribute?.type === 'base-component'
  },
}
