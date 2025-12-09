export default {
  transformGroup: 'css',
  buildPath: 'build/css/cube/',
  files: [
    // 2. CUBE: Composition → @layer objects
    {
      destination: 'cube.composition.css',
      format: 'cube/css-variables-layer',
      filter: (token) => {
        if (token.attributes.category === 'cube') {
        }
        return token.attributes.category === 'cube';
      },
      options: {
        layerName: 'objects', // ITCSS x CUBE
        selector: ':root',
        outputReferences: true,
      },
    },
    // 3. CUBE: Block → @layer components
    {
      destination: 'cube.block.css',
      format: 'cube/css-variables-layer',
      filter: (token) => token.filePath.includes('/block'),
      options: {
        layerName: 'components',
        selector: ':root',
        outputReferences: true,
      },
    },
    // 4. CUBE: Utility → @layer utilities
    {
      destination: 'cube.utility.css',
      format: 'cube/css-variables-layer',
      filter: (token) => token.filePath.includes('/utility'),
      options: {
        layerName: 'utilities',
        selector: ':root',
        outputReferences: true,
      },
    },
  ],
};
