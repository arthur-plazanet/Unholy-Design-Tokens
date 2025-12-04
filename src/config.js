import StyleDictionary from 'style-dictionary';
import { formats, transformGroups } from 'style-dictionary/enums';
import { filterBuildTimeSCSS } from './filters/filter-build-time-scss.js';
import {
  privateThemeTemplate,
  publicThemeTemplate,
  themeTypesFormatter,
} from './formatters/theme-types.js';
import { cubeCssVariablesLayerFormatter } from './formatters/cube-css.js';
import { parseInitialTheme } from './parsers/initial-theme-parser.js';
import { componentStatesTransform } from './transforms/component-states.js';

StyleDictionary.registerParser(parseInitialTheme);
StyleDictionary.registerFilter(filterBuildTimeSCSS);

StyleDictionary.registerFormat(themeTypesFormatter);
StyleDictionary.registerTransform(componentStatesTransform);

StyleDictionary.registerFormat(publicThemeTemplate);
StyleDictionary.registerFormat(privateThemeTemplate);
StyleDictionary.registerFormat(cubeCssVariablesLayerFormatter);

function generateThemeFiles(directories) {
  const genericAttributes = {
    format: formats.cssVariables,
    options: {
      outputReferences: true,
    },
  };
  return directories.map((dir) => {
    return {
      ...genericAttributes,
      // output the dironent tokens in the right folder and file e.g. dironents/button/button-vars.css
      destination: `${dir}/${dir}.css`,
      format: formats.cssVariables,
      // only include the tokens that are inside this dironent token group
      filter: (token) => {
        // console.log('📟 - dir → ', dir)
        if (token.attributes.type === 'conditional') {
          // console.log('📟 - token → ', token)
        }

        return token.path[0] === dir || token.attributes.type === dir;
      },
    };
  });
}

function generateInitialThemeTokens() {
  return {
    parser: 'initial-theme-parser',
    source: ['./style-dictionary/tokens/initial-theme.json'],
    platforms: {
      css: {
        transformGroup: transformGroups.css,
        transforms: ['attribute/cti', 'color/hsl'],
        buildPath: './src/assets/css/theme/',
        clearBuildPath: true,
        files: [
          {
            destination: 'initial-theme.css',
            format: formats.cssVariables,
          },
        ],
      },
    },
  };
}

// const initialDictionary = StyleDictionary.extend(generateInitialThemeTokens())

export default {
  parser: 'initial-theme-parser',
  source: ['src/tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      transforms: [
        // 'color/hue',
        // 'color/saturation',
        // 'color/lightness',
        'attribute/cti', // pick up category/type/item
        // 'color/hsl',
        // 'custom/component-state',
      ],
      buildPath: './build/css/',
      clearBuildPath: true,

      files: [
        {
          destination: 'conditional.css',
          format: formats.cssVariables,
          filter: (token) => {
            return token.attribute?.type === 'conditional';
          },
        },
        {
          destination: 'themes/private-theme.css',
          format: 'private-theme',
          filter: (token) => {
            console.log('📟 - token → ', token);
            if (token.attributes?.category === 'base') {
              console.log('📟 - token → ', token);
            }
            return token.attributes?.category === 'base';
          },
          // options: {
          //   fileHeader: (defaultMessage) => {
          //     return [...defaultMessage, 'Base component variables']
          //   },
          // },
        },
        {
          destination: 'themes/public-theme.css',
          format: 'public-theme',
          filter: (token) => {
            console.log('📟 - token → ', token);
            if (token.attributes?.category === 'base') {
              console.log('📟 - token → ', token);
            }
            return token.attributes?.category === 'base';
          },
        },

        // -------------------------------------------------------
        /**
         * OKlch tokens
         */
        // {
        //   destination: 'primitives.css',
        //   format: formats.cssVariables,
        //   filter: (token) => {
        //     return token.attributes?.type === 'primitive'
        //   },
        // },
        // {
        //   destination: 'variant.css',
        //   format: formats.cssVariables,
        //   filter: (token) => {
        //     return token.attributes?.category === 'variant'
        //   },
        //   options: {
        //     fileHeader: (defaultMessage) => {
        //       return [...defaultMessage, 'Variant tokens']
        //     },
        //   },
        // },
        {
          destination: 'variants.css',
          format: formats.cssVariables,
          filter: (token) => {
            const variants = ['variant', 'state', 'color'];
            return variants.includes(token.attributes?.category);
          },
          options: {
            fileHeader: (defaultMessage) => {
              return [...defaultMessage, 'Variant tokens'];
            },
          },
        },
        ...generateThemeFiles(['component']),
      ],
    },
    // Type declarations
    // ts: {
    //   transformGroup: 'js',
    //   buildPath: 'build/types/',
    //   files: [
    //     {
    //       destination: 'theme.d.ts',
    //       format: 'typescript/theme-declarations',
    //     },
    //   ],
    // },
    // 2. CUBE: Composition → @layer objects
    cssCubeComposition: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'cube.composition.css',
          format: 'cube/css-variables-layer',
          filter: (token) => token.filePath.includes('/composition'),
          options: {
            layerName: 'objects', // ITCSS x CUBE
            selector: ':root',
            outputReferences: true,
          },
        },
      ],
    },

    // 3. CUBE: Block → @layer components
    cssCubeBlock: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
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
      ],
    },

    // 4. CUBE: Utility → @layer utilities
    cssCubeUtility: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
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
    },
  },
};
