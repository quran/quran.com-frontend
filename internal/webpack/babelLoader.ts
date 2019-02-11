import { removeNil } from '../../shared/utils/arrays';
import config from '../../config';

// @ts-ignore
const babelLoader = ({
  buildOptions,
  ifDevClient,
  ifDev,
  ifProd,
}: $TsFixMe) => ({
  loader: 'babel-loader',
  // We will create a babel config and pass it through the plugin
  // defined in the project configuration, allowing additional
  // items to be added.
  options: config('plugins.babelConfig')(
    // Our "standard" babel config.
    {
      // We need to ensure that we do this otherwise the babelrc will
      // get interpretted and for the current configuration this will mean
      // that it will kill our webpack treeshaking feature as the modules
      // transpilation has not been disabled within in.
      babelrc: false,

      presets: removeNil([
        // For our client bundles we transpile all the latest ratified
        // ES201X code into ES5, safe for browsers.  We exclude module
        // transilation as webpack takes care of this for us, doing
        // tree shaking in the process.
        // ifClient([
        //   '@babel/preset-env',
        //   {
        //     modules: false,
        //   },
        //   'preset-env-client',
        // ]),
        // // For a node bundle we use the specific target against
        // // babel-preset-env so that only the unsupported features of
        // // our target node version gets transpiled.
        // ifNode([
        //   '@babel/preset-env',
        //   {
        //     targets: {
        //       node: true,
        //     },
        //   },
        //   'preset-env-node',
        // ]),
        // JSX
        '@babel/preset-react',
        ['@babel/preset-typescript'],
      ]),

      plugins: removeNil([
        '@babel/plugin-transform-runtime',
        // '@babel/plugin-transform-react-display-name',
        '@babel/plugin-proposal-export-default-from',
        // '@babel/plugin-proposal-export-namespace-from',
        // '@babel/plugin-syntax-import-meta',
        '@babel/plugin-proposal-class-properties',
        // '@babel/plugin-proposal-json-strings',
        // '@babel/plugin-proposal-function-sent',
        // '@babel/plugin-proposal-numeric-separator',
        // '@babel/plugin-proposal-throw-expressions',
        // '@babel/plugin-proposal-logical-assignment-operators',
        // '@babel/plugin-proposal-optional-chaining',
        // [
        //   '@babel/plugin-proposal-pipeline-operator',
        //   {
        //     proposal: 'minimal',
        //   },
        // ],
        // '@babel/plugin-proposal-nullish-coalescing-operator',
        // '@babel/plugin-proposal-do-expressions',
        // '@babel/plugin-proposal-function-bind',
        // // Required to support react hot loader.
        ifDevClient('react-hot-loader/babel'),
        // // This decorates our components with  __self prop to JSX elements,
        // // which React will use to generate some runtime warnings.
        ifDev('@babel/plugin-transform-react-jsx-self'),
        // // // Adding this will give us the path to our components in the
        // // // react dev tools.
        ifDev('@babel/plugin-transform-react-jsx-source'),
        // // // Replaces the React.createElement function with one that is
        // // // more optimized for production.
        // // // NOTE: Symbol needs to be polyfilled. Ensure this feature
        // // // is enabled in the polyfill.io configuration.
        ifProd('@babel/plugin-transform-react-inline-elements'),
        // // // Hoists element creation to the top level for subtrees that
        // // // are fully static, which reduces call to React.createElement
        // // // and the resulting allocations. More importantly, it tells
        // // // React that the subtree hasn’t changed so React can completely
        // // // skip it when reconciling.
        // ifProd(
        //   '@babel/plugin-transform-react-constant-elements'
        // ),
        '@babel/plugin-syntax-dynamic-import',
        // // ifNode([
        // //   '@babel/plugin-system-import-transformer',
        // //   {
        // //     modules: 'common',
        // //   },
        // // ]),
        // // ifProd([
        // //   [
        // //     'babel-plugin-styled-components',
        // //     {
        // //       ssr: true,
        // //     },
        // //   ],
        // // ]),
      ]),
    },
    buildOptions
  ),
});

export default babelLoader;
